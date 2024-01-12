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
      const newCard = new cardModel(
        {
          title,
          description,
          members: membersObjectIds,
          dueDate,
          list: listId,
          cover,
          attachments
        }
      )
      const saveCard = await newCard.save()

      // Thêm id của card mới vào mảng cards trong List
      await listModel.findByIdAndUpdate(
        listId,
        {
          $push: {
            cards: saveCard._id
          }
        }
      )

      return saveCard
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
        }
      )

      return updatedCard
    } catch (error) {
      throw error
    }
  }

  deleteCard = async (cardId) => {
    try {
      await cardModel.findByIdAndDelete(cardId)
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
