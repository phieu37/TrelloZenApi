// const loginValidationSchema = require("../validators/loginValidation")
// const registerValidationSchema = require("../validators/registerValidation")

// // Kiểm tra và xác thực dữ liệu đầu vào trước khi chuyển nó đến controller
// const validateUserData = (req, res, next) => {
//   const { error, value } = loginValidationSchema.validate(req.body, { abortEarly: false })
//   if (error) {
//     const errorMessages = error.details.map((detail) => detail.message)
//     return res.status(400).json({ errors: errorMessages })
//   }
//   // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middlewares tiếp theo/xử lý logic
//   req.body = value
//   next()
// }

// module.exports = {
//   validateUserData,
// }