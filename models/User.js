const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },

    role: {
      type: String
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    birthday: {
      type: Date,
      required: false
    },

    password: {
      type: String,
      required: true
    },

    avatar: {
      type: String
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = mongoose.model("user", UserSchema);
