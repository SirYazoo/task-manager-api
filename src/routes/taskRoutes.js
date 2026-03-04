const express = require("express");
const router = express.Router();
const { createTask, getTasks } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTasks).post(protect, createTask);

module.exports = router;
