const express = require("express");
const {
  signup,
  login,
  updateProfile,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/profile/:userId", updateProfile);

module.exports = router;
