// const mongoose = require('mongoose')
const cardModel = require('../models/cardModel')
const listModel = require('../models/listModel')
const userModel = require('../models/userModel')

class CardService {
  createCard = async (title, description, members, dueDate, listId, cover, attachments) => {
    try {
      // Chuyển đổi members từ username thành ObjectId
      const membersObjectIds = await Promise.all(
        members.map(async memberUsername => {
          const user = await userModel.findOne({ username: memberUsername })
          // return user ? user._id : null
          return user?._id
        })
      )
      const newCard = await cardModel.create({
        title,
        description,
        members: membersObjectIds,
        dueDate,
        list: listId,
        cover,
        attachments
      })

      // Thêm id của card mới vào mảng cards trong List
      await listModel.findByIdAndUpdate(
        listId,
        {
          $push: {
            cards: newCard._id
          }
        }
      )

      return newCard
    } catch (error) {
      throw error
    }
  }

  updateCard = async (cardId, title, description, members, dueDate, cover, attachments) => {
    try {
      const updatedCard = await cardModel.findByIdAndUpdate(
        cardId,
        {
          title,
          description,
          members,
          dueDate,
          cover,
          attachments,
        },
        { new: true } // Tùy chọn này để trả về bản ghi đã được cập nhật
      )

      return updatedCard
    } catch (error) {
      throw error
    }
  }

  deleteCard = async (cardId) => {
    try {
      const cardInListToDelete = await cardModel.findById(cardId)
      await cardModel.findByIdAndDelete(cardId)

      // tồn tại card và nằm trong list, thì cập nhật lại mảng cards trong list
      if (cardInListToDelete && cardInListToDelete.list) {
        await listModel.findByIdAndUpdate(
          cardInListToDelete.list,
          {
            $pull: {
              cards: cardId
            }
          })
      }
    } catch (error) {
      throw error
    }
  }

  getCardsInList = async (listId) => {
    try {
      const cards = await cardModel.find({ list: listId })

      return cards
    } catch (error) {
      throw error
    }
  }

  getCardDetails = async (cardId) => {
    try {
      const card = await cardModel.findById(cardId)

      return card
    } catch (error) {
      throw error
    }
  }
}

module.exports = new CardService()
