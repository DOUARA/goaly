const express = require("express");
const router = express.Router();

// @route     GET api/goals
// @desc      Test route
// @access    Public
router.get("/", (req, res) => {
  res.send("Goals API");
});

module.exports = router;
