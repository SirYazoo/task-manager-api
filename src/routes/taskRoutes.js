const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const taskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Task title is required")
    .trim()
    .escape(),
  body("description").optional().trim().escape(),
  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Invalid status value"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.use(protect);
// Route: /api/tasks
router.route("/").get(getTasks).post(taskValidation, validate, createTask);

// Route: /api/tasks/:id
router
  .route("/:id")
  .put(taskValidation, validate, updateTask)
  .delete(deleteTask);

module.exports = router;
