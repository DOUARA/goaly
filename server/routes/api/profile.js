const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// @route     GET api/profile
// @desc      Profile index
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json([{ msg: "Internal Server Error" }]);
  }
});

// @route     POST api/profile/name
// @desc      Update User Full Name
// @access    Private
router.post("/name", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const { name } = req.body;

    // Udate the user name
    user.name = name;

    await user.save();

    res.send({ msg: "Your name has been updated successfully" });
  } catch (error) {
    res.status(500).json([{ msg: "Internal Server Error" }]);
  }
});

// @route     POST api/profile/role
// @desc      Role
// @access    Private
router.post("/role", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const { role } = req.body;
    // Udate the user name
    user.role = role;

    await user.save();

    res.send({ msg: "Your Role has been Updated Successfully" });
  } catch (error) {
    res.status(500).json([{ msg: "Internal Server Error" }]);
  }
});

// @route     POST api/profile/update
// @desc      update Email and Password
// @access    Private
router.post(
  "/update",
  auth,
  [
    check("email", "Invalid Email").isEmail(),
    check("password", "Password Should have at least 6 Characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      // Find validations on this request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const user = await User.findById(req.user.id);
      console.log(user);
      const { email, password } = req.body;

      if (email != user.email) {
        // Check if email exists
        const result = await User.findOne({ email });

        if (result) {
          return res.status(422).json({ errors: [{ msg: "Email Exists" }] });
        }

        user.email = email;

        // Password hash and update
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.send({ msg: "Profile info has been updated successfully" });
      } else {
        // Password hash and update
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.send({ msg: "Profile info has been updated successfully" });
      }
    } catch (error) {
      res.status(500).json([{ msg: "Internal Server Error" }]);
    }
  }
);

module.exports = router;
