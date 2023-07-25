const express = require('express')
const app = express()
const cors = require('cors')
const appConfig = require('./utils/config')
require('dotenv').config()

// routers
// const testRouter = require('./controllers/test');
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const articleRouter = require('./controllers/articles')
// const {config} = require("dotenv"); // TODO: Is this really needed?
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use(middleware.requestLogger)

if (appConfig.NODE_ENV !== 'test') {
  const { connectDB } = require('./mongo/database')
  connectDB()
}

// app.use('/api/test', testRouter);
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/articles', articleRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
