const decodedToken = require('./helpers/decodedToken')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const decoded = decodedToken(req.headers.authorization)
    req.user = decoded
    next()
  } catch(e) {
    res.status(401).json({message: 'Пользователь не авторизован'})
  }
}