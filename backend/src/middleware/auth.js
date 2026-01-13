// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // optional if storing hashed passwords
const User = require("../models/user"); // your user model

// POST /api/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    // If password is hashed
    const validPassword = password === user.password; // replace with bcrypt if hashed
    // const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(401).json({ message: "Invalid email or password" });

    // Optional: generate token if needed
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default auth;
