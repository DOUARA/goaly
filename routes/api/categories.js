const express = require("express");
const router = express.Router();

// @route     GET api/categories
// @desc      Test route
// @access    Public
router.get("/", (req, res) => {
  res.send("Categories API");
});

module.exports = router;
