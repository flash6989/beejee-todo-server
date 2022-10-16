const jwt = require('jsonwebtoken')

module.exports = function (bearer) {
  const token = bearer.split(' ')[1]
  if (!token) {
    res.status(401).json({message: 'Пользователь не авторизован'})
  }
  return jwt.verify(token, process.env.SECRET_KEY)
}