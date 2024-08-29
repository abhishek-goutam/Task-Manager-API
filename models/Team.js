const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Team.belongsToMany(User, { through: 'UserTeams' });
User.belongsToMany(Team, { through: 'UserTeams' });

module.exports = Team;
