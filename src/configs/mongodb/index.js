// Tạo kết nối đến mongo cloud(database)
const mongoose = require('mongoose')

const DATABASE_URI = process.env.MONGODB_URI

async function connect() {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log('Database - Connect successfully !!!')

  } catch (error) {
    console.log('Database - Connect failure!!!', error)
  }
}

module.exports = { connect }
