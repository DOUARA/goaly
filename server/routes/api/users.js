const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const smtpTransport = require("../../config/google-smtp");
const APPURL = config.get("APPURL");

// @route     Post api/users
// @desc      Register a User
// @access    Public
router.post(
  "/",
  [
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

    const { email, password } = req.body;

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
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(12);

      user.password = await bcrypt.hash(password, salt);

      const payload = {
        user: {
          id: user.id
        }
      };

      // Verify email token
      jwt.sign(payload, config.get("jwtSecretEmail"), (err, token) => {
        if (err) throw err;
        user.emailToken = token;

        // Send activation email
        const mailOptions = {
          from: "aer17013@gmail.com",
          to: email,
          subject: "Goaly - Activate your email",
          generateTextFromHTML: true,
          html: `<b> to activate your account please go to<br><br><a href="${APPURL}/verify/${token}">${APPURL}/verify/${token}</b>`
        };

        smtpTransport.sendMail(mailOptions, (error, response) => {
          error ? console.log(error) : console.log(response);
          smtpTransport.close();
        });
      });

      // save user
      await user.save();

      res.send({
        msg: "Register Success! Please check your email"
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route     Post api/users/verify
// @desc      Activate user email
// @access    Public
router.get("/verify/:token", async (req, res) => {
  const token = req.params.token;
  if (!token) {
    return res.status(400).json({ errors: [{ msg: "Invalid token" }] });
  }
  // Get the user id
  try {
    const decoded = jwt.verify(token, config.get("jwtSecretEmail"));
    const userId = decoded.user.id;

    // Update user active status
    const user = await User.findById(userId);
    if (user) {
      if (user.active) {
        res.status(401).json({ errors: [{ msg: "Already Activated" }] });
      }
      user.active = true;
      await user.save();
      res.send({ msg: "Email has been verified successfully" });
    } else {
      return res.status(401).json({ errors: [{ msg: "User not found" }] });
    }
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: "Invalid Token" }] });
  }
});

// @route     Post api/users/forgot_password
// @desc      Email to rest password
// @access    Public
router.post(
  "/forgot_password",
  [check("email", "Invalid Email").isEmail()],
  async (req, res) => {
    // Find validations on this request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(422)
          .json({ errors: [{ msg: "Email doesn't exist" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      const token = jwt.sign(payload, config.get("jwtSecretPswd"), {
        expiresIn: 1800
      });

      // Send the email
      const mailOptions = {
        from: "jscbiss@gmail.com",
        to: email,
        subject: "Goaly - Reset Password",
        generateTextFromHTML: true,
        html: `<b> To reset your password please go to<br><br><a href="${APPURL}/password_reset/${token}">${APPURL}/password_reset/${token}</b><br><br/>If you haven't asked to reset your password please ignore this email`
      };

      await smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
      });
      res.json({ msg: "Please Check your email" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route     Post api/users/reset_password
// @desc      Email to rest password
// @access    Public
router.post(
  "/reset_password",
  [
    check("password", "Password Should have at least 6 Characters").isLength({
      min: 6
    }),
    check("token", "Invalid token")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // Find validations on this request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { password, token } = req.body;

    try {
      const decoded = jwt.verify(token, config.get("jwtSecretPswd"));
      const userId = decoded.user.id;

      const user = await User.findById(userId);
      if (user) {
        // Update user password
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        return res.send({ msg: "password has been updated successfully" });
      } else {
        return res.status(401).json({ errors: [{ msg: "User not found" }] });
      }
    } catch (err) {
      return res.status(401).json({ errors: [{ msg: "Invalid Token" }] });
    }
  }
);

module.exports = router;
