const listService = require('../services/listService')

class listController {
  createList = async (req, res, next) => {
    try {
      // const { boardId, title, position } = req.body
      const { boardId } = req.params
      const { title, position } = req.body
      const newList = await listService.createList(boardId, title, position)

      res.status(201).json({
        message: 'Tạo list trong 1 board thành công',
        list: newList
      })
    } catch (error) {
      next(error)
    }
  }

  updateList = async (req, res, next) => {
    try {
      const { listId } = req.params
      const { title, position } = req.body
      const updatedList = await listService.updateList(listId, title, position)

      res.status(201).json({
        message: 'Sửa list thành công',
        list: updatedList
      })
    } catch (error) {
      next(error)
    }
  }

  deleteList = async (req, res, next) => {
    try {
      const { listId } = req.params
      await listService.deleteList(listId)

      res.status(200).json({ message: 'Xóa list thành công' })
    } catch (error) {
      next(error)
    }
  }

  getListsInBoard = async (req, res, next) => {
    try {
      const { boardId } = req.params
      const lists = await listService.getListsInBoard(boardId)

      res.status(200).json({
        message: 'Danh sách các list trong board',
        list: lists
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new listController()
