const express = require("express");
const router = express.Router();

// @route     GET api/dasboard
// @desc      Test route
// @access    Public
router.get("/", (req, res) => {
  res.send("Dashboard API");
});

module.exports = router;
