require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ApiError = require('../error/ApiError')
const {Task, User} = require('../models/models')
const { validationResult } = require('express-validator')

const generateJwt = (id, login, roles ) => {
 return jwt.sign({ id, login, roles }, process.env.SECRET_KEY, {expiresIn: '24h'})
}

async function fetchTasks(req, res, next){
  let {limit, page, filter} = req.query
  console.log(limit, page, filter, 'limit, page, filter')
  page = page || 1
  limit = limit || 3
  let offset = page * limit - limit
  const tasks = await Task.findAndCountAll({limit, offset, order: [[filter.filterName, filter.direction]]} )
  return res.json(tasks)
}
async function createTask(req, res, next) {
  try {
    const { text, userName, email } = req.body
    console.log(text, userName, email)
    const task = await Task.create({ text, userName, email })
    console.log('createTask')
    res.json(task)
  } catch(e) {
    next(ApiError.badRequest(e.message))
  }
}
async function changeTask(req, res) {
  console.log(req.body)
  const {id, text} = req.body
  const task = await Task.update({ text, whoEdited: 'admin' }, {
    where: {
      id
    }
  });
  console.log(task, 'changeTask')
  res.json({message: 'Запись успешно отредактирована'})

}
async function login(req, res, next) {
  try {
    const {login, password} = req.body
    const user = await User.findOne({where: {login}})
    if (!user) {
      return next(ApiError.internal('Пользователь с таким логином не найден'))
    }
    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }
    const token = generateJwt(user.id, user.login, user.roles)
    res.json({token})
  } catch(e) {
    next(ApiError.badRequest(e.message))
  }
  
}

async function registration(req, res, next) {
  try {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      return res.status(400).json({ message: 'Ошибка при регистрации', errors})
    }

    const { password, roles, login } = req.body
    const isFindUser = await User.findOne({where: {login}})

    if( isFindUser ) {
      return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ password: hashPassword, roles, login })
    const token = generateJwt(user.id, user.login, user.roles)
    res.json({token})
  } catch(e) {
    next(ApiError.badRequest(e.message))
  }
  
}

function checkAuth(req, res) {
  const tokenReq = req.headers.authorization
  if(!tokenReq) {
    next(ApiError(''))
  }
  const decoded = jwt.verify(tokenReq.split(' ')[1], process.env.SECRET_KEY);
  const token = generateJwt(decoded.id, decoded.login, decoded.roles)
  return res.json({token})
}

module.exports = {
  fetchTasks, createTask, changeTask, login, registration, checkAuth
}