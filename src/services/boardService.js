const boardModel = require('../models/boardModel')
const listModel = require('../models/listModel')

class boardService {
  createBoard = async (boardData) => {
    try {
      const newBoard = new boardModel(boardData)
      
      return await newBoard.save()
    } catch (error) {
      throw error
    }
  }

  updateBoard = async (boardId, boardData) => {
    try {
      return await boardModel.findByIdAndUpdate(boardId, boardData)
    } catch (error) {
      throw error
    }
  }

  deleteBoard = async (boardId) => {
    try {
      await boardModel.findByIdAndDelete(boardId)
      await listModel.deleteMany({ board: boardId })
      return true
    } catch (error) {
      throw error
    }
  }

  getAllBoard = async () => {
    try {
      return await boardModel.find()
    } catch (error) {
      throw error
    }
  }
}

module.exports = new boardService()
