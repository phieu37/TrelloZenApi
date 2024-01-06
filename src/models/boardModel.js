// tiêu đề, cover, ngày tạo
const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  cover: {
    type: String
  },
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }]
}, { timestamps: true })

module.exports = mongoose.model('Board', boardSchema)
