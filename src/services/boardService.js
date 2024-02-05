const boardModel = require('../models/boardModel')
const listModel = require('../models/listModel')
const cardModel = require('../models/cardModel')

class boardService {
  createBoard = async (boardData) => {
    try {
      return await boardModel.create(boardData)
    } catch (error) {
      throw error
    }
  }

  updateBoard = async (boardId, boardData) => {
    try {
      const updatedBoard = await boardModel.findByIdAndUpdate(boardId, boardData, { new: true })

      return updatedBoard
    } catch (error) {
      throw error
    }
  }

  deleteBoard = async (boardId) => {
    try {
      // Tìm danh sách list thuộc về board, chỉ lấy ra trường _id để giảm dung lượng trả về
      const listsOfBoard = await listModel.find({ board: boardId }, '_id')
      // lấy ra mảng chứa các _id
      const listIds = listsOfBoard.map(list => list._id)
      // $in lọc và xóa tất cả card có trường list thuộc về một trong các list có _id trong mảng listIds
      await cardModel.deleteMany({ list: { $in: listIds } })
      // Xóa bảng
      await boardModel.findByIdAndDelete(boardId)
      // Xóa tất cả các danh sách thuộc về bảng
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
