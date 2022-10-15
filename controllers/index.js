const ApiError = require('../error/ApiError')
const {Task, User} = require('../models/models')

async function getTasks(req, res, next){
  const tasks = await Task.findAll()
  return res.json(tasks)
}
async function createTask(req, res) {
  const { text, userId,  } = req.body
  console.log(text)
  const task = await Task.create({ text, userId: 1, status: false })
  console.log('createTask')
  res.json(task)

}
function changeTask(req, res) {

  console.log('changeTask')
  res.json()

}
function login(req, res, next) {
  console.log('login')
}

async function createUser(req, res) {
  const { userName, email, password, roles, login } = req.body
  console.log(userName, email, password, roles, login)
  const task = await User.create({ userName, email, password, roles, login })
  console.log('createUser')
  res.json(task)
}

function checkAuth(req, res) {

}

module.exports = {
  getTasks, createTask, changeTask, login, createUser
}