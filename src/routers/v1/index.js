const express = require('express')
const router = express.Router()
const authRouter = require('./authRoutes')
const userRouter = require('./userRoutes')
const boardRouter = require('./boardRoutes')
const listRouter = require('./listRoutes')
const cardRouter = require('./cardRoutes')

router.get('/status', (req, res) => {
  res.status(200).json({ msg: 'API are ready' })
})

// register/login
router.use('/auth', authRouter)

// actions user
router.use('/user', userRouter)

// board
router.use('/board', boardRouter)

// list
router.use('/list', listRouter)

// card
router.use('/card', cardRouter)

module.exports = router
