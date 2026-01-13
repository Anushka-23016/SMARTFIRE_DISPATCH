const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // only if passwords are hashed
const User = require("../models/User"); // your User model

// POST /api/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body; // or email if you use email

  try {
    const user = await User.findOne({ username }); // find user in DB
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // If you stored hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    // If password is correct, send success (optionally send a token)
    return res.json({ success: true, message: "Login successful", token: "dummy-token" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default auth;
