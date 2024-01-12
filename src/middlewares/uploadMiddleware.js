// C1: đẩy file ổ đĩa (DiskStorage) -> nên dùng (đang lỗi khi dùng 2 ổ 1 thì ok)
// const multer = require('multer')

// const coverStorage = multer.diskStorage({
//   destination: 'public/uploadCovers',
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   }
// })

// const attachmentsStorage = multer.diskStorage({
//   destination: 'public/uploadAttachments',
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
// })

// const uploadCover = multer({ storage: coverStorage }).single('cover')
// const uploadAttachments = multer({ storage: attachmentsStorage }).array('attachments', 3)

// module.exports = {
//   uploadCover,
//   uploadAttachments
// }

// C2: đẩy file (MemoryStorage) -> cứt lag máy
// const multer = require('multer')

// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

// const uploadCover = upload.single('cover')

// module.exports = uploadCover

// Phải tự tạo thư mục trước
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'cover') {
      cb(null, 'public/cover')
    } else if (file.fieldname === 'attachments') {
      cb(null, 'public/attachments')
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
const cpUpload = upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'attachments', maxCount: 3 }
])

module.exports = cpUpload
