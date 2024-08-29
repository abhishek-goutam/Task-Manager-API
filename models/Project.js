const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Team = require('./Team');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Project.belongsTo(Team);
Team.hasMany(Project);

module.exports = Project;
