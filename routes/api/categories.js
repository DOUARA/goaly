const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Category = require("../../models/Category");
const { check, validationResult } = require("express-validator");

// @route     GET , api/categories
// @desc      Categories List
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    await Category.find({ user: req.user.id }, (err, categories) => {
      if (!categories) {
        return res.status(404).json({ errors: [{ msg: "No Categories" }] });
      }
      res.send(categories);
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// @route     POST api/categories/new
// @desc      Add new Category
// @access    Private
router.post(
  "/new",
  auth,
  [
    check("name", "Category Name is Required")
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

      const { name, color } = req.body;

      if (await Category.findOne({ name: name, user: req.user.id })) {
        return res.status(422).json({ errors: [{ msg: "Category Exists" }] });
      }

      const newCategory = new Category({
        user: req.user.id,
        name: name,
        color: color
      });
      await newCategory.save();

      res.send(newCategory);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route     GET api/categories/edit/:catId
// @desc      Get Category
// @access    Private
router.get("/edit/:catId", auth, async (req, res) => {
  try {
    const catId = req.params.catId;
    await Category.findOne(
      { _id: catId, user: req.user.id },
      (err, category) => {
        if (!category) {
          return res
            .status(404)
            .json({ errors: [{ msg: "Category not Found" }] });
        }
        res.send(category);
      }
    );
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

// @route     POST api/categories/edit/:catId
// @desc      Edit Category
// @access    Private
router.post(
  "/edit/:catId",
  auth,
  [
    check("name", "Category Name is Required")
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
      const catId = req.params.catId;

      const { name, color } = req.body;
      await Category.findOne(
        { _id: catId, user: req.user.id },
        (err, category) => {
          if (!category) {
            return res
              .status(404)
              .json({ errors: [{ msg: "Category Not Found" }] });
          }
          category.name = name;
          category.color = color;

          category.save();
          res.send(category);
        }
      );
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route     POST api/categories/delete/:catId
// @desc      Delete a category
// @access    Private
router.delete("/delete/:catId", auth, async (req, res) => {
  try {
    const catId = req.params.catId;
    await Category.findOneAndRemove(
      { user: req.user.id, _id: catId },
      { useFindAndModify: false }
    );
    res.send({ msg: "Category Removed" });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
