// backend/routes/auth.js

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

/* ======================
   TEST ROUTE
====================== */
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Backend is working!" });
});

/* ======================
   AUTH ROUTES
====================== */
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
