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

  deleteUser = async (idUser) => {
    try {
      // gọi đến tầng model
      const deleteUser = await userModel.findByIdAndDelete(idUser)

      return deleteUser
    } catch (error) {
      throw error
    }
  }
}

module.exports = new userService()