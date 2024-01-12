const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  dueDate: {
    type: String
  },
  cover: {
    data: Buffer,
    originalname: String,
    mimetype: String
  },
  attachments: [
    {
      data: Buffer,
      originalname: String,
      mimetype: String
    }
  ],
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }
}, { timestamps: true })

const Card = mongoose.model('Card', cardSchema)

module.exports = Card
