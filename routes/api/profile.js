const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

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

    // Continue here
    res.send(user);
  } catch (error) {
    res.status(500).json([{ msg: "Internal Server Error" }]);
  }
});

module.exports = router;
