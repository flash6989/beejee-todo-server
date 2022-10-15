const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  roles: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ['guest'] },
  login: { type: DataTypes.STRING, unique: true }
})

const Task = sequelize.define('task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING },
  whoEdited: { type: String}
})

User.hasMany(Task)
Task.belongsTo(User)

module.exports = {
  User, Task
}