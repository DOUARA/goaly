const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Goal = require("../../models/Goal");
const Category = require("../../models/Category");
const { check, validationResult } = require("express-validator");

// @route     GET , api/goals
// @desc      Goals List
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    await Goal.find({ user: req.user.id }, (err, goals) => {
      if (!goals) {
        return res.status(404).json({ errors: [{ msg: "No goals" }] });
      }
      res.send(goals);
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// @route     POST api/goals/new
// @desc      Add a new Goal
// @access    Private
router.post(
  "/new",
  auth,
  [
    check("name", "Goal Name is Required")
      .not()
      .isEmpty(),
    check("deadline", "You should add a deadline to motivate yourself")
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

      const { name, category_id, deadline } = req.body;

      await Category.findOne(
        { _id: category_id, user: req.user.id },
        (err, category) => {
          if (!category) {
            return res
              .status(422)
              .json({ errors: [{ msg: "Category not Found" }] });
          }
        }
      );

      await Goal.findOne(
        { name, user: req.user.id, category_id },
        (err, goal) => {
          if (goal) {
            return res.status(422).json({ errors: [{ msg: "Goal Exists" }] });
          }
          const newGoal = new Goal({
            user: req.user.id,
            category_id,
            name,
            deadline
          });

          newGoal.save();

          res.send(newGoal);
        }
      );
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route     GET api/categories/edit/:goalId
// @desc      Get Category
// @access    Private
router.get("/edit/:goalId", auth, async (req, res) => {
  try {
    const goalId = req.params.goalId;
    await Goal.findOne({ _id: goalId, user: req.user.id }, (err, goal) => {
      if (!goal) {
        return res.status(404).json({ errors: [{ msg: "goal not Found" }] });
      }
      res.send(goal);
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

// @route     POST api/categories/edit/:goalId
// @desc      Edit Goal
// @access    Private
router.post(
  "/edit/:goalId",

  auth,
  [
    check("name", "Goal Name is Required")
      .not()
      .isEmpty(),
    check("deadline", "You should add a deadline to motivate yourself")
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
      const goalId = req.params.goalId;
      const { name, category_id, deadline } = req.body;

      await Category.findOne(
        { _id: category_id, user: req.user.id },
        (err, category) => {
          if (!category) {
            return res
              .status(422)
              .json({ errors: [{ msg: "Category not Found" }] });
          }
        }
      );

      await Goal.findOne(
        { _id: goalId, user: req.user.id, category_id },
        (err, goal) => {
          if (!goal) {
            return res
              .status(404)
              .json({ errors: [{ msg: "Goal Not Found" }] });
          }
          if (goal.name == name) {
            return res.status(422).json({ errors: [{ msg: "Goal Exists" }] });
          }

          goal.deadline = deadline;
          goal.name = name;
          goal.category_id = category_id;

          goal.save();
          res.send(goal);
        }
      );
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route     POST api/goals/delete/:goalId
// @desc      Delete a goal
// @access    Private
router.delete("/delete/:goalId", auth, async (req, res) => {
  try {
    const goalId = req.params.goalId;
    await Goal.findOneAndRemove({ user: req.user.id, _id: goalId });
    res.send({ msg: "Goal Removed" });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
