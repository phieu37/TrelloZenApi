const boardModel = require('../models/boardModel')

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
      return await boardModel.findByIdAndDelete(boardId)
    } catch (error) {
      throw error
    }
  }

  getAllBoards = async () => {
    try {
      return await boardModel.find()
    } catch (error) {
      throw error
    }
  }
}

module.exports = new boardService()
