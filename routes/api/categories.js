const express = require("express");
const router = express.Router();

// @route     GET , api/goals/list
// @desc      Goals List
// @access    Private
router.get(["/", "/list"], (req, res) => {
  res.send("categories list");
});

// @route     GET api/goals/new
// @desc      Add new goal (test)
// @access    Private
router.get("/new", (req, res) => {
  res.send("add new category");
});

module.exports = router;
