const Router = require('express')
const router = new Router()
const { check } = require('express-validator')

const { getTasks, createTask, changeTask, login, registration } = require('../controllers')

const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/gettasks', getTasks)
router.post('/createtask', createTask)
router.put('/changetask', checkRoleMiddleware('admin'), changeTask)
router.post('/login', login)
router.post('/registration', [
  check('login', 'Логин не может быть пустым').notEmpty(),
  check('password', 'Пароль должен быть от 3 до 10 символов').isLength({ min: 3, max: 10 })
], registration)


module.exports = router