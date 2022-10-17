const Router = require('express')
const router = new Router()

const { fetchTasks, createTask, changeTask, login, checkAuth, changeStatusTask, registration } = require('../controllers')

const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/fetchtasks', fetchTasks)
router.post('/createtask', createTask)
router.post('/changetask', checkRoleMiddleware('admin'), changeTask)
router.post('/changestatustask', checkRoleMiddleware('admin'), changeStatusTask)
router.post('/login', login)
router.get('/checkauth', checkAuth)
router.post('/registration', [
  check('login', 'Логин не может быть пустым').notEmpty(),
  check('password', 'Пароль должен быть от 3 до 10 символов').isLength({ min: 3, max: 10 })
], registration)

module.exports = router