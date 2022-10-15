const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  password: { type: DataTypes.STRING },
  roles: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ['guest'] },
  login: { type: DataTypes.STRING, unique: true }
})

const Task = sequelize.define('task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false},
  userName: {type: DataTypes.STRING, allowNull: false},
  status: { type: DataTypes.BOOLEAN, defaultValue: false },
  whoEdited: { type: DataTypes.STRING}
})

module.exports = {
  User, Task
}