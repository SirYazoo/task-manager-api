require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const app = express();
app.disable("x-powered-by");
const cosrOptions = {
  origin: [
    "http://localhost:5173",
    "https://task-manager-api-frontend-steel.vercel.app",
  ],
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(cosrOptions));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Task Manager API" });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
