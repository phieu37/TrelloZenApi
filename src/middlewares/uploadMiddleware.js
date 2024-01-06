// C1: đẩy vào đường dẫn trên vscode
// const multer = require('multer')
// // const path = require('path')

// // Cấu hình multer để lưu trữ tệp tin cover
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     // cb(null, Date.now() + path.extname(file.originalname))
//     cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
//   },
// })

// const upload = multer({ storage: storage })

// // Middleware để xử lý việc upload cover
// const uploadCover = upload.single('file')
// // 
// module.exports = uploadCover

// C2: đẩy lên DB
// const multer = require('multer')

// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

// const uploadCover = upload.single('file')

// module.exports = uploadCover

// C3: kết hợp 1 2
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

const uploadCover = upload.single('file')

const convertToBase64 = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  try {
    const fileBuffer = fs.readFileSync(req.file.path)
    const base64Image = fileBuffer.toString('base64')
    req.body.cover = base64Image
    next()
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  uploadCover,
  convertToBase64
}
