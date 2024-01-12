const express = require('express')
const router = express.Router()
const listController = require('../../controllers/listController')
const validateData = require('../../validators/validateData')

router.get(
  '/:boardId',
  validateData.validateListData,
  listController.getListsInBoard
)
router.post(
  '/:boardId',
  validateData.validateListData,
  listController.createList
)
router.put(
  '/:listId',
  validateData.validateListData,
  listController.updateList
)
router.delete(
  '/:listId',
  validateData.validateListData,
  listController.deleteList
)

module.exports = router
