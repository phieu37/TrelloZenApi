const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class userService {
  registerUser = async (username, email, password) => {
    try {
      const existingUsername = await userModel.findOne({ username })
      if (existingUsername) {
        throw new Error('Tên người dùng đã tồn tại')
      }

      const existingEmail = await userModel.findOne({ email })
      if (existingEmail) {
        throw new Error('Email đã tồn tại')
      }

      // KT2: tự động tạo muối và băm password
      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
      })

      return newUser
    } catch (error) {
      throw error
    }
  }

  loginUser = async (username, password) => {
    try {
      const usernameExist = await userModel.findOne({ username })
      if (!usernameExist) {
        throw new Error('Username không tồn tại')
      }

      // So sánh password gửi lên với password trong DB
      const isPasswordValid = await bcrypt.compare(password, usernameExist.password)
      if (!isPasswordValid) {
        throw new Error('Mật khẩu không đúng')
      }

      // Tạo và gửi token
      const token = jwt.sign(
        { isAdmin: usernameExist.isAdmin },
        process.env.SECRET_KEY_JWT,
        { expiresIn: '1h' }
      )

      return token
    } catch (error) {
      throw error
    }
  }

  getAllUsers = async () => {
    try {
      // gọi đến tầng model
      const getUsers = await userModel.find()

      return getUsers
    } catch (error) {
      throw error
    }
  }

  deleteUser = async (userId) => {
    try {
      const deleteUser = await userModel.findByIdAndDelete(userId)

      return deleteUser
    } catch (error) {
      throw error
    }
  }
}

module.exports = new userService()
