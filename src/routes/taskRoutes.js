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

const createTaskValidation = [
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

const updateTaskValidation = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Task title cannot be empty if provided")
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
router
  .route("/")
  .get(getTasks)
  .post(createTaskValidation, validate, createTask);

// Route: /api/tasks/:id
router
  .route("/:id")
  .put(updateTaskValidation, validate, updateTask)
  .delete(deleteTask);

module.exports = router;
