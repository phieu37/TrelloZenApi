const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']

  if (!token) {
    return res.status(401).send({ error: true, message: 'Token không được cung cấp' })
  }

  token = token.replace(/^Bearer\s+/, '')

  jwt.verify(token, process.env.SECRET_KEY_JWT, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: 'Từ chối truy cập' })
    }

    // thằng này ko có thông tin isAdmin trong payload
    // req.username = decoded.username
    // lưu trữ toàn bộ đối tượng người dùng từ payload của JWT vào req.user
    req.user = decoded
    next()
  })
}

// mở isAdmin=true để cấp quyền
const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
     res.status(403).json('Bạn không phải là admin không thể xóa người dùng')
    }
  })
}

module.exports = {
  verifyToken,
  verifyTokenAdmin
}
