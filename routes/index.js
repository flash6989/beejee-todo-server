const Router = require('express')
const router = new Router()
const { check } = require('express-validator')

const { fetchTasks, createTask, changeTask, login, registration, checkAuth } = require('../controllers')

const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/fetchtasks', fetchTasks)
router.post('/createtask', createTask)
router.post('/changetask', checkRoleMiddleware('admin'), changeTask)
router.post('/login', login)
router.post('/registration', [
  check('login', 'Логин не может быть пустым').notEmpty(),
  check('password', 'Пароль должен быть от 3 до 10 символов').isLength({ min: 3, max: 10 })
], registration)
router.get('/checkauth', checkAuth)


module.exports = router