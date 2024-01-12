const express = require('express')
const router = express.Router()
const { verifyToken, verifyTokenAdmin } = require('../../middlewares/verifyTokenMiddleware')
const userController = require('../../controllers/userController')

// get all user
router.get('/', verifyToken, userController.getAllUsers)

// delete user by Admin
router.delete("/:id", verifyTokenAdmin, userController.deleteUser)

module.exports = router