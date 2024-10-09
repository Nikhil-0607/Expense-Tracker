const Profile = require("../models/profileModel");
const User = require("../models/UserModel");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, profileData } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const profile = new Profile({ userId: user._id, ...profileData });
    await profile.save();

    user.profile = profile._id;
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      userId: user._id,
      profileId: profile._id,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { bio, age, phone } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const profile = await Profile.findOneAndUpdate(
      { userId: user._id },
      { bio, age, phone },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found!" });
    }

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    res.status(500).json({ message: "Server Error while updating" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const profile = await Profile.findOne({ userId: user._id });
    res.status(200).json({ message: "Login successful", user, profile });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
