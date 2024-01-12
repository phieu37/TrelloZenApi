const userService = require("../services/userService")

class userController {
  getAllUsers = async (req, res, next) => {
    try {
      // gọi đến service
      const users = await userService.getAllUsers()

      res.status(200).json({
        msg: 'Danh sách user',
        users
      })
    } catch (error) {
      next(error)
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      // lấy id
      const userId = req.params

      // gọi đến service
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