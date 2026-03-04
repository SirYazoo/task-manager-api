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

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route: /api/tasks
router
  .route("/")
  .get(protect, getTasks)
  .post(
    protect,
    [
      body("title").notEmpty().withMessage("Title is required").trim().escape(),
      body("description").optional().trim().escape(),
    ],
    validate,
    createTask,
  );

// Route: /api/tasks/:id
router
  .route("/:id")
  .put(
    protect,
    [
      body("title").optional().withMessage("Title is required").trim().escape(),
      body("status")
        .optional()
        .isIn(["pending", "completed"])
        .withMessage("Invalid status"),
    ],
    validate,
    updateTask,
  )
  .delete(protect, deleteTask);

module.exports = router;
