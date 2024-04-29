const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [];
let taskId = 0;

const validateInput = (req, res, next) => {
  const { title, description, completed } = req.body;
  if (
    !title ||
    !description ||
    completed === undefined ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({ error: "something missing" });
  }
  next();
};
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id == id);
  if (!task) {
    res.status(404).json({ message: "task not found" });
  }
  res.status(200).json(task);
});
app.post("/task", validateInput, (req, res) => {
  const task = {
    id: taskId++,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };
  // console.log("Task",task)
  tasks.push(task);
  res.status(201).json(task);
});

app.put("/task/:id", validateInput, (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  const taskIndex = tasks.findIndex((task) => task.id == id);

  if ((taskIndex = -1)) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks[taskIndex] = { id, title, description, completed };
  res.status(200).json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
});
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;