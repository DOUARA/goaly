const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  role: {
    type: String
  }
});

module.exports = mongoose.model("profile", ProfileSchema);
