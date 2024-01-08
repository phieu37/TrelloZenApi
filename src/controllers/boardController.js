const boardService = require('../services/boardService')

class boardController {
  createBoard = async (req, res, next) => {
    try {
      const { title } = req.body
      const cover = {
        // data: req.file.buffer,
        data : req.file.buffer.toString('base64'),
        mimetype: req.file.mimetype,
        originalname: req.file.originalname
      }

      const boardData = { title, cover }
      const newBoard = await boardService.createBoard(boardData)

      res.status(201).json({
        message: 'Tạo board và load file thành công',
        board: newBoard
      })
    } catch (error) {
      next(error)
    }
  }

  updateBoard = async (req, res, next) => {
    try {
      const boardId = req.params.id
      const { title } = req.body
      const cover = {
        // data: req.file.buffer,
        data : req.file.buffer.toString('base64'),
        mimetype: req.file.mimetype,
        originalname: req.file.originalname
      }
      const boardData = { title, cover }
      const updatedBoard = await boardService.updateBoard(boardId, boardData)

      res.status(200).json({
        message: 'Sửa board thành công',
        board: updatedBoard
      })
    } catch (error) {
      next(error)
    }
  }

  deleteBoard = async (req, res, next) => {
    try {
      const boardId = req.params.id
      await boardService.deleteBoard(boardId)

      res.status(200).json({ message: 'Xóa board thành công' })
    } catch (error) {
      next(error)
    }
  }

  getAllBoards = async (req, res, next) => {
    try {
      const boards = await boardService.getAllBoards()

      res.status(200).json({
        message: 'Danh sách board',
        board: boards
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new boardController()
