const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 3, max: 20, unique: true },
  email: { type: String, required: true, max: 50, unique: true },
  password: { type: String, min: 6, required: true },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User
