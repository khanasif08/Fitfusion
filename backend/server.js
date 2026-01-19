// backend/server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

/* ======================
   Database Connection
====================== */
connectDB();

/* ======================
   Middleware
====================== */
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* ======================
   Routes
====================== */
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

/* ======================
   Serve Frontend
====================== */
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* ======================
   Server Start
====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
