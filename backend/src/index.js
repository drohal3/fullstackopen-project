const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const httpServer = http.createServer(app)
const PORT = config.PORT || 3001
// const User = require('./mongo/models/user')
// const Article = require('./mongo/models/article')
const cors = require('cors')
const bodyParser = require('body-parser')

// const jwt = require('jsonwebtoken')

// TODO: httpServer.applyMiddleware({ app }) ...to pass express js httpServer to apollo httpServer

// TODO: move to separate files
// fullstack open course: https://github.com/drohal3/fullstackopen-part8
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'world'
  }
}

async function startServer () {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    // context: async ({ req }) => {
    //   const auth = req ? req.headers.authorization : null
    //   if (auth && auth.toLowerCase().startsWith('bearer ')) {
    //     const decodedToken = jwt.verify(
    //       auth.substring(7), process.env.SECRET
    //     )
    //     const currentUser = await User.findById(decodedToken.id)
    //     return {currentUser} // {currentUser:currentUser}
    //   }
    // }
  })

  await server.start()

  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server))

  httpServer.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

startServer()
