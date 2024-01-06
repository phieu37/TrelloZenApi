const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
require('dotenv').config()
const API_v1 = require('./routers/v1')
const db = require('./configs/mongodb')
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware')

const port = process.env.APP_PORT

// Connect to DB
db.connect()

// HTTP request logger middleware
app.use(morgan('common'))

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/v1', API_v1)

app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
