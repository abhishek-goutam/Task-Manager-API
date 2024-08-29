const Task = require('../models/Task');
const User = require('../models/User');
const { Op } = require('sequelize');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  try {
    const task = await Task.create({ title, description, dueDate, priority, status });
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Get all tasks (with optional filters)
exports.getTasks = async (req, res) => {
  const { status, priority, assignedTo } = req.query;
  const whereClause = {};

  if (status) whereClause.status = status;
  if (priority) whereClause.priority = priority;
  if (assignedTo) whereClause.assignedTo = assignedTo;

  try {
    const tasks = await Task.findAll({ where: whereClause });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate, priority, status } = req.body;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    await task.save();
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

// Assign a task to a user
exports.assignTask = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.body;  // User to assign the task to
  try {
    const task = await Task.findByPk(taskId);
    const user = await User.findByPk(userId);

    if (!task || !user) {
      return res.status(404).json({ message: 'Task or User not found' });
    }

    task.assignedTo = userId;
    await task.save();

    res.json({ message: `Task assigned to user ${userId} successfully`, task });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning task', error });
  }
};

// Filter tasks by status, priority, etc.
exports.filterTasks = async (req, res) => {
  const { status, priority, dueDate } = req.query;
  const whereClause = {};

  if (status) whereClause.status = status;
  if (priority) whereClause.priority = priority;
  if (dueDate) whereClause.dueDate = { [Op.lte]: new Date(dueDate) };  // Tasks due before or on the specified date

  try {
    const tasks = await Task.findAll({ where: whereClause });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering tasks', error });
  }
};

// Search tasks by title or description
exports.searchTasks = async (req, res) => {
  const { query } = req.query;
  try {
    const tasks = await Task.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } }
        ]
      }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error searching tasks', error });
  }
};
