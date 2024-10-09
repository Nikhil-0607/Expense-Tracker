const mongoose = require("mongoose");
const Profile = require("./profileModel");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  },
  { timestamps: true }
);


const User = mongoose.model('User', userSchema);

module.exports = User;