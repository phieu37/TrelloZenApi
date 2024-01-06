const Joi = require('joi')

validateBoardData = async (req, res, next) => {
  // Định nghĩa schema cho dữ liệu gửi lên
  const boardValidationSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    cover: Joi.string()
  })

  try {
    // Kiểm tra và xác thực dữ liệu đầu vào trước khi chuyển nó đến controller
    await boardValidationSchema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateBoardData
}