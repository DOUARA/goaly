const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

const User = require("../../models/User");

// @route     Post api/users
// @desc      Register a User
// @access    Public
router.post(
  "/",
  [
    check("name", "Name is Required")
      .not()
      .isEmpty(),
    check("email", "Invalid Email").isEmail(),
    check("password", "Password Should have at least 6 Characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // Find validations on this request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // If User Exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(12);

      user.password = await bcrypt.hash(password, salt);

      user.save();

      // Register User
      res.send("User Registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }

    res.send(req.body);
  }
);

module.exports = router;
