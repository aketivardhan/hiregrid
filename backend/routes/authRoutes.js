const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {

  const { email, password, role } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.json({ message: "User already exists" });
  }

  const user = new User({ email, password, role });
  await user.save();

  res.json({ message: "Registered successfully" });
});

// LOGIN
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    email: user.email,
    role: user.role
  });
});

module.exports = router;