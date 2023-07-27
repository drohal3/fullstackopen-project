const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServer } = require('@apollo/server')

const appConfig = require('./utils/config')
require('dotenv').config()

// routers
// const testRouter = require('./controllers/test');
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const articleRouter = require('./controllers/articles')
const middleware = require('./utils/middleware')


const {typeDefs, resolvers} = require('./graphql/schema')

const app = express()
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

const server = new ApolloServer({
  typeDefs,
  resolvers
})

// TODO: ApolloServerPluginDrainHttpServer - needed?
server.start().then(() => {
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server, {
    context: async ({ req }) => ({ user: req.user })
  }))
  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)
})

module.exports = app
