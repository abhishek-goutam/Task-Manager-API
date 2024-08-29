const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignTask,
  filterTasks,
  searchTasks,
} = require("../controllers/taskController");
const router = express.Router();

// Create a new task
router.post("/", createTask);

// Get all tasks (with optional filters)
router.get("/", getTasks);

// Get a task by ID
router.get("/:taskId", getTaskById);

// Update a task
router.put("/:taskId", updateTask);

// Delete a task
router.delete("/:taskId", deleteTask);

// Assign a task to a user
router.post("/:taskId/assign", assignTask);

// Filter tasks by status, priority, etc.
router.get("/filter", filterTasks);

// Search tasks by title or description
router.get("/search", searchTasks);

module.exports = router;
