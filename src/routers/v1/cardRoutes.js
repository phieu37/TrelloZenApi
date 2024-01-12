const express = require('express')
const router = express.Router()
const cardController = require('../../controllers/cardController')
const validateData = require('../../validators/validateData')
const cpUpload = require('../../middlewares/uploadMiddleware')

router.post(
  '/:listId',
  cpUpload,
  validateData.validateCardData,
  cardController.createCard
)
router.put(
  '/:cardId',
  cpUpload,
  validateData.validateCardData,
  cardController.updateCard
)
router.delete(
  '/:listId/:cardId',
  cardController.deleteCard
)
router.get(
  '/:listId',
  cardController.getCardsInList
)
router.get(
  '/:listId/:cardId',
  cardController.getCardDetails
)

module.exports = router
