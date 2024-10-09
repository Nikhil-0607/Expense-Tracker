const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bio: { type: String },
    phone: {
      type: String,
      required: true,
      unique: true,
      minLength: 10,
      maxLength: 15,
      validate: {
        validator: (value) => /^\+?\d{1,15}$/.test(value),
        message: "Invalid phone number",
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 99,
      validate: {
        validator: (value) =>
          Number.isInteger(value) && value >= 18 && value <= 99,
        message: "Invalid age",
      },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
