
const listModel = require('../models/listModel')
const boardModel = require('../models/boardModel')

class listService {
  createList = async (boardId, title, position) => {
    try {
      const newList = new listModel(
        {
          board: boardId,
          title,
          position
        }
      )
      const savedList = await newList.save()

      // Thêm Id của list mới vào mảng lists trong Board
      await boardModel.findByIdAndUpdate(
        boardId,
        {
          $push: {
            lists: savedList._id
          }
        }
      )

      return savedList
    } catch (error) {
      throw error
    }
  }

  updateList = async (listId, title, position) => {
    try {
      const updatedList = await listModel.findByIdAndUpdate(
        listId,
        { title, position }
      )

      return updatedList
    } catch (error) {
      throw error
    }
  }

  deleteList = async (listId) => {
    try {
      const listInBoardToDelete = await listModel.findById(listId)
      await listModel.findByIdAndDelete(listId)

      // tồn tại list và nằm trong board, thì cập nhật lại mảng lists trong Board
      if (listInBoardToDelete && listInBoardToDelete.board) {
        await boardModel.findByIdAndUpdate(
          listInBoardToDelete.board,
          {
            $pull: {
              lists: listId
            }
          })
      }

      return true
    } catch (error) {
      throw error
    }
  }

  getListsInBoard = async (boardId) => {
    try {
      const lists = await listModel.find({ board: boardId })

      return lists
    } catch (error) {
      throw error
    }
  }
}

module.exports = new listService()
