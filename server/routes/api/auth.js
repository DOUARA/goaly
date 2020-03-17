const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const axios = require("axios");
var generator = require("generate-password");

// @route     GET api/auth
// @desc      Test
// @access    Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json([{ msg: "Internal Server Error" }]);
  }
});

// @route     POST api/auth/login
// @desc      Login
// @access    Public
router.post(
  "/login",
  [
    check("email", "Invalid Email").isEmail(),
    check("password", "Password is Required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // Find validations on this request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // If User Exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Checking password
      const passwordCheck = await bcrypt.compare(password, user.password);

      if (!passwordCheck) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      if (!user.active) {
        return res
          .status(400)
          .json({ errors: [{ msg: "You have to activate your email first" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 1000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route     POST api/auth/google
// @desc      Google OAuth2 Authentication
// @access    Public
router.post(
  "/google",
  [
    check("tokenId", "Google Login has failed")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // Find validations on this request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { tokenId } = req.body;

    try {
      // Decoding the token id
      const decodedToken = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`
      );
      const email = decodedToken.data.email;

      /* If User Exists */
      let user = await User.findOne({ email });

      if (!user) {
        // Register the user
        const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

        // Generate a random password
        const password = generator.generate({
          length: 10,
          numbers: true
        });

        user = new User({
          email,
          avatar,
          password,
          active: true
        });

        const salt = await bcrypt.genSalt(12);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
      }

      // Generate Login token
      const payload = {
        user: {
          id: user.id
        }
      };

      await jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 1000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
