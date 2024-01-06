const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class authController {
  // Đăng ký
  register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body

      // KT2: tự động tạo muối và băm password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Kiểm tra email tồn tại
      const emailExist = await userModel.findOne({ email })
      if (emailExist) {
        return res.status(400).json({ message: 'Email đã tồn tại' });
      }

      // Kiểm tra username tồn tại
      const usernameExist = await userModel.findOne({ username })
      if (usernameExist) {
        return res.status(400).json({ message: 'Username đã tồn tại' });
      }

      // tạo mới theo model
      const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
      })

      res.status(201).json({ user: newUser })
    } catch (error) {
      next(error)
    }
  }

  // Đăng nhập
  login = async (req, res, next) => {
    try {
      // lấy data gửi lên và tìm đối tượng trong db
      const { username, password } = req.body
      const userCheck = await userModel.findOne({ username })

      // Kiểm tra user tồn tại
      if (!userCheck) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' })
      }

      // Kiểm tra mật khẩu, so sánh password gửi lên với password trong DB
      const isPasswordValid = await bcrypt.compare(password, userCheck.password)
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mật khẩu không đúng' })
      }

      // Tạo và gửi token
      const token = jwt.sign(
        {
          // id: userCheck._id,
          isAdmin: userCheck.isAdmin,
        },
        process.env.SECRET_KEY_JWT,
        { expiresIn: "1h" }
      )
      res.status(200).json({ token })

    } catch (error) {
      next(error)
    }
  }
}

module.exports = new authController()
