const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM('open', 'completed'),
    defaultValue: 'open',
  }
});

// Task-User relationship
Task.belongsTo(User, { as: 'assignedTo' });
User.hasMany(Task, { foreignKey: 'assignedToId' });

module.exports = Task;
