const userService = require("../services/userService")

class userController {
  register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body
      const newUser = await userService.registerUser(username, email, password)

      res.status(200).json({
        msg: 'Tạo user thành công',
        user: newUser
      })
    } catch (error) {
      next(error)
    }
  }

  login = async (req, res, next) => {
    try {
      const { username, password } = req.body
      const token = await userService.loginUser(username, password)

      res.status(200).json({ 
        msg: 'Token để đăng nhập',
        token 
      })
    } catch (error) {
      next(error)
    }
  }

  getAllUsers = async (req, res, next) => {
    try {
      const getUsers = await userService.getAllUsers()

      res.status(200).json({
        msg: 'Danh sách user',
        getUsers
      })
    } catch (error) {
      next(error)
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.params
      const deleteUser = await userService.deleteUser(userId)

      res.status(200).json({
        msg: 'Xóa user thành công',
        deleteUser
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new userController()
