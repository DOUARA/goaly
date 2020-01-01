const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },

    category_id: {
      type: Schema.Types.ObjectId,
      ref: "category"
    },

    name: {
      type: String,
      required: true
    },

    deadline: {
      type: Date,
      required: true
    }
  },
  { strict: false }
);

module.exports = mongoose.model("goal", GoalSchema);
