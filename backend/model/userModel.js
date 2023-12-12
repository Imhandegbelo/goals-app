const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide a name"],
    },
    email: {
      type: String,
      required: [true, "Provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Provide a password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
