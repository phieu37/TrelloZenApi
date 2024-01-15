const Joi = require('joi')

// User
const validateUserData = async (req, res, next) => {
  // Định nghĩa schema cho dữ liệu gửi lên
  const userValidationSchema = Joi.object({
    username: Joi.string().required().min(3).max(30).trim().strict(),
    email: Joi.string().email().trim().strict(),
    password: Joi.string().required().min(6).trim().strict()
  })

  try {
    // Kiểm tra và xác thực dữ liệu đầu vào trước khi chuyển nó đến controller
    await userValidationSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

// Board
const validateBoardData = async (req, res, next) => {
  const boardValidationSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    cover: Joi.object({
      data: Joi.binary().required(),
      mimetype: Joi.string().required(),
      originalname: Joi.string().required()
    })
  })

  try {
    await boardValidationSchema.validateAsync(req.body, { abortEarly: false })
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

// card
const validateCardData = async (req, res, next) => {
  const cardValidationSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(1000).trim().strict(),
    members: Joi.array().items(Joi.string()),
    dueDate: Joi.string(),
    cover: Joi.object({
      data: Joi.binary(),
      originalname: Joi.string(),
      mimetype: Joi.string()
    }),
    attachments: Joi.array().items(Joi.object({
      data: Joi.binary(),
      originalname: Joi.string(),
      mimetype: Joi.string()
    }))
  })

  try {
    await cardValidationSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateUserData,
  validateBoardData,
  validateListData,
  validateCardData
}
