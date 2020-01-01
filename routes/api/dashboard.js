const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// @route     GET api/dashboard
// @desc      Test route
// @access    Public
router.get("/", auth, (req, res) => {
  res.send("This is the dashboard page");
});

module.exports = router;
