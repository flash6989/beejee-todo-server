const jwt = require('jsonwebtoken')
const decodedToken = require('./helpers/decodedToken')

module.exports = function(role) {

  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const decoded = decodedToken(req.headers.authorization)
      if (decoded.role !== role) {
        res.status(401).json({message: 'Нет доступа'})
      }
      req.user = decoded
      next()
    } catch(e) {
      res.status(401).json({message: 'Пользователь не авторизован'})
    }
  }
}