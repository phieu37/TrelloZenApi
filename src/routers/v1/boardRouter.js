const express = require('express')
const router = express.Router()
const boardController = require('../../controllers/boardController')
const validateBoardData = require('../../validators/boardValidation')
const {uploadCover,convertToBase64} = require('../../middlewares/uploadMiddleware.js')

router.post('/', validateBoardData.validateBoardData, uploadCover,convertToBase64, boardController.createBoard)
router.put('/:id', validateBoardData.validateBoardData, uploadCover, boardController.updateBoard)
router.delete('/:id', validateBoardData.validateBoardData, boardController.deleteBoard)
router.get('/', validateBoardData.validateBoardData, boardController.getAllBoards)

module.exports = router
