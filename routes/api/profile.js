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
router.post(
  "/name",
  auth,
  [
    check("name", "Name Should Not Be Empty")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      // Find validations on this request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const user = await User.findById(req.user.id).select("-password");

      const { name } = req.body;

      // Udate the user name
      user.name = name;

      await user.save();

      // Continue here
      res.send("Name Updated Successfully");
    } catch (error) {
      res.status(500).json([{ msg: "Internal Server Error" }]);
    }
  }
);

// @route     POST api/profile/role
// @desc      Role
// @access    Private
router.post("/role", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const { role } = req.body;
    console.log(role);
    // Udate the user name
    user.role = role;

    await user.save();

    // Continue here
    res.send("Role Updated Successfully");
  } catch (error) {
    res.status(500).json([{ msg: "Internal Server Error" }]);
  }
});

// @route     POST api/profile/birthday
// @desc      Update Birthday
// @access    Private
router.post("/birthday", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const { birthday } = req.body;

    // Udate the user name
    user.birthday = birthday;

    await user.save();

    // Continue here
    res.send(user);
  } catch (error) {
    res.status(500).json([{ msg: "Internal Server Error" }]);
  }
});

// @route     POST api/profile/email
// @desc      Email
// @access    Private
router.post(
  "/email",
  auth,
  [check("email", "Invalid Email").isEmail()],
  async (req, res) => {
    try {
      // Find validations on this request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const user = await User.findById(req.user.id);
      const { email } = req.body;

      user.email = email;

      await user.save();

      res.send(user);
    } catch (error) {
      res.status(500).json([{ msg: "Internal Server Error" }]);
    }
  }
);

// @route     POST api/profile/password
// @desc      Password
// @access    Private
router.post(
  "/password",
  auth,
  [
    check("password", "Password Should be at Least 6 Charachters").isLength({
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
      const { password } = req.body;

      if (await bcrypt.compare(password, user.password)) {
        return res.status(422).json({
          errors: [
            {
              msg: "Password Should be Different Than the Old Password"
            }
          ]
        });
      }

      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("Password Updated Successfully");
    } catch (error) {
      res.status(500).json([{ msg: "Internal Server Error" }]);
    }
  }
);

module.exports = router;
