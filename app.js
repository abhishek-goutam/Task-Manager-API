require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');  // Import Sequelize instance

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const teamRoutes = require('./routes/teamRoutes');
const projectRoutes = require('./routes/projectRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));  // Serve static files

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/teams', teamRoutes);
app.use('/projects', projectRoutes);
app.use('/profile', profileRoutes);

// Database connection and server start
sequelize.sync({ force: false }).then(() => {   // Sync the database models
  console.log("Database connected and tables created!");
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => {
  console.error("Error connecting to the database: ", err);
});
