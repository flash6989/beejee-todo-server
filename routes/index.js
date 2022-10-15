const Router = require('express')
const router = new Router()

const { getTasks, createTask, changeTask, login, createUser } = require('../controllers')

router.get('/gettasks', getTasks)
router.post('/createtask', createTask)
router.put('/changetask', changeTask)
router.post('/login', login)
router.post('/createuser', createUser)


module.exports = router