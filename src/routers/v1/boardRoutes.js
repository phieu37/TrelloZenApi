const express = require('express')
const router = express.Router()
const boardController = require('../../controllers/boardController')
const validateData = require('../../validators/validateData')
const uploadCover = require('../../middlewares/uploadMiddleware')

router.post('/', validateData.validateBoardData, uploadCover, boardController.createBoard)
router.put('/:id', validateData.validateBoardData, uploadCover, boardController.updateBoard)
router.delete('/:id', validateData.validateBoardData, boardController.deleteBoard)
router.get('/', validateData.validateBoardData, boardController.getAllBoard)

module.exports = router
