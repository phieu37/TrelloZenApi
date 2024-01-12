const cardService = require('../services/cardService')

class CardController {
  createCard = async (req, res, next) => {
    try {
      const { listId } = req.params
      const { title, description, members, dueDate } = req.body

      // const cover = {
      //   data: req.file.filename,
      //   mimetype: req.file.mimetype,
      //   originalname: req.file.originalname
      // }
      // // const attachments = req.files.map(file => ({
      //   const attachments = (req.files ?? []).map(file => ({
      //   data: file.filename,
      //   mimetype: file.mimetype,
      //   originalname: file.originalname
      // }))

      const cover = req.files['cover'] ? {
        data: req.files['cover'][0].filename,
        mimetype: req.files['cover'][0].mimetype,
        originalname: req.files['cover'][0].originalname,
      } : null

      const attachments = req.files['attachments']?.map((file) => ({
        data: file.filename,
        mimetype: file.mimetype,
        originalname: file.originalname
      })) || []

      const newCard = await cardService.createCard(
        title, description, members, dueDate, listId, cover, attachments
      )

      res.status(201).json({
        message: 'Tạo mới card thành công',
        card: newCard
      })
    } catch (error) {
      next(error)
    }
  }

  updateCard = async (req, res, next) => {
    try {
      const { cardId } = req.params
      const { title, description, members, dueDate } = req.body
      const cover = req.files['cover'] ? {
        data: req.files['cover'][0].filename,
        mimetype: req.files['cover'][0].mimetype,
        originalname: req.files['cover'][0].originalname,
      } : null
      const attachments = req.files['attachments']?.map((file) => ({
        data: file.filename,
        mimetype: file.mimetype,
        originalname: file.originalname
      })) || []
      const updatedCard = await cardService.updateCard(cardId, title, description, members, dueDate, cover, attachments)

      res.status(200).json({
        message: 'Cập nhật card thành công',
        card: updatedCard,
      })
    } catch (error) {
      next(error)
    }
  }

  deleteCard = async (req, res, next) => {
    try {
      const { cardId } = req.params
      await cardService.deleteCard(cardId)

      res.status(200).json({ message: 'Xóa card thành công' })
    } catch (error) {
      next(error)
    }
  }

  getCardsInList = async (req, res, next) => {
    try {
      const { listId } = req.params
      const cards = await cardService.getCardsInList(listId)

      res.status(200).json({
        message: 'Danh sách các card trong list',
        cards,
      })
    } catch (error) {
      next(error)
    }
  }

  getCardDetails = async (req, res, next) => {
    try {
      const { cardId } = req.params
      const card = await cardService.getCardDetails(cardId)

      res.status(200).json({
        message: 'Thông tin chi tiết của card',
        card,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new CardController()
