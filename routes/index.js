const Router = require('express')
const router = new Router()

const { fetchTasks, createTask, changeTask, login, checkAuth, changeStatusTask } = require('../controllers')

const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/fetchtasks', fetchTasks)
router.post('/createtask', createTask)
router.post('/changetask', checkRoleMiddleware('admin'), changeTask)
router.post('/changestatustask', checkRoleMiddleware('admin'), changeStatusTask)
router.post('/login', login)
router.get('/checkauth', checkAuth)


module.exports = router