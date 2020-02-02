const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: false,
      lowercase: true,
      trim: true
    },

    role: {
      type: String,
      lowercase: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
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
