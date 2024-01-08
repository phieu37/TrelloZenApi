// C1: đẩy file ổ đĩa
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

// C2: đẩy file lên DB
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const uploadCover = upload.single('file')

module.exports = uploadCover
