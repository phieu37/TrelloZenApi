const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card'
    }
  ]
}, { timestamps: true })

const List = mongoose.model('List', listSchema)

module.exports = List
