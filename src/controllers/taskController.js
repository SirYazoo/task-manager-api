const { query } = require("../config/db");

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const userId = req.user.id;

    const newTask = await query(
      "INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, description],
    );

    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task" });
  }
};

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [userId],
    );

    res.status(200).json(tasks.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const userId = req.user.id;

    const task = await query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [id, userId],
    );

    if (task.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    const updatedTask = await query(
      "UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *",
      [
        title || task.rows[0].title,
        description || task.rows[0].description,
        status || task.rows[0].status,
        id,
      ],
    );

    res.status(200).json(updatedTask.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task" });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const userId = req.user.id;

    const result = await query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
