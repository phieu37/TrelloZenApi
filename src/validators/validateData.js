const Joi = require('joi')

// Board
const validateBoardData = async (req, res, next) => {
  // Định nghĩa schema cho dữ liệu gửi lên
  const boardValidationSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    cover: Joi.object({
      data: Joi.binary().required(),
      mimetype: Joi.string().required(),
      originalname: Joi.string().required()
    })
  })

  try {
    // Kiểm tra và xác thực dữ liệu đầu vào trước khi chuyển nó đến controller
    await boardValidationSchema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

// List
const validateListData = async (req, res, next) => {
  const listValidationSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    position: Joi.number().required().min(0)
  })

  try {
    await listValidationSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateBoardData,
  validateListData
}
