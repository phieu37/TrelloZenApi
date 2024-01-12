const express = require('express')
const router = express.Router()
const boardController = require('../../controllers/boardController')
const validateData = require('../../validators/validateData')
const cpUpload = require('../../middlewares/uploadMiddleware')

router.post(
  '/',
  cpUpload,
  validateData.validateBoardData,
  boardController.createBoard
)
router.put(
  '/:boardId',
  cpUpload,
  validateData.validateBoardData,
  boardController.updateBoard
)
router.delete(
  '/:boardId',
  boardController.deleteBoard
)
router.get(
  '/',
  boardController.getAllBoard
)

module.exports = router
