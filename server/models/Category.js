const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },

    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    color: {
      type: String
    }
  },
  { strict: false }
);

module.exports = mongoose.model("category", CategorySchema);
