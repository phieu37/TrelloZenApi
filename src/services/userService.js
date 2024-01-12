const userModel = require("../models/userModel")

class userService {
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
