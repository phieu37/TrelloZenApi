const boardService = require('../services/boardService')

class boardController {
  createBoard = async (req, res, next) => {
    try {
      const { title } = req.body
      // const cover = {
      //   // C2 MemoryStorage
      //   // data: req.file.buffer, 
      //   // C1 DiskStorage
      //   data: req.file.filename,
      //   mimetype: req.file.mimetype,
      //   originalname: req.file.originalname
      // }

      const cover = req.files['cover'] ? req.files['cover'][0] : null

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
      // const boardId = req.params.id
      const { boardId } = req.params
      const { title } = req.body
      const cover = req.files['cover'] ? req.files['cover'][0] : null
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
      const { boardId } = req.params
      await boardService.deleteBoard(boardId)

      res.status(200).json({ message: 'Xóa board thành công' })
    } catch (error) {
      next(error)
    }
  }

  getAllBoard = async (req, res, next) => {
    try {
      const boards = await boardService.getAllBoard()

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
