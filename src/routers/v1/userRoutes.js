const express = require('express')
const router = express.Router()
const { verifyToken, verifyTokenAdmin } = require('../../middlewares/verifyTokenMiddleware')
const userController = require('../../controllers/userController')
const { validateUserData } = require('../../validators/validateData')

// Đăng ký
router.post(
  '/register',
  validateUserData,
  userController.register
)
// Đăng nhập
router.post(
  '/login',
  validateUserData,
  userController.login
)

// get all user
router.get(
  '/',
  verifyToken,
  userController.getAllUsers
)

// delete user by Admin
router.delete(
  '/:userId',
  verifyTokenAdmin,
  userController.deleteUser
)

module.exports = router
