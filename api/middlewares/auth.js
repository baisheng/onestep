const jwt = require('jsonwebtoken')
const config = require('../config/config')

exports.user = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ errorMsg: '认证码失效，请重新登录', success: false })
        }
        return res.status(401).json({ errorMsg: '认证失败', success: false })
      }
      req.userId = decoded._id
      next()
    })
  } else {
    res.status(403).json({
      errorMsg: '请提供认证码',
      success: false,
    })
  }
}
