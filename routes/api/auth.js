const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

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

// @route     GET api/auth/login
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
