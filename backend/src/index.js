// const { ApolloServer } = require('@apollo/server')
const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const expressServer = http.createServer(app)
const PORT = config.PORT || 3001
// const User = require('./mongo/models/user')
// const Article = require('./mongo/models/article')

// const jwt = require('jsonwebtoken')

// TODO: expressServer.applyMiddleware({ app }) ...to pass express js expressServer to apollo expressServer

// TODO: move to separate files
// fullstack open course: https://github.com/drohal3/fullstackopen-part8
// const typeDefs = gql`
//   type Author {
//     nickName: String!
//     id: ID!
//   }
//
//   type Article {
//     title: String!
//     abstract: String
//     content: String!
//     author: Author!
//     id: ID!
//   }
//
//   type Query {
//     allArticles(author_id: String): [Article!]!
//   }
// `

// const resolvers = {
//   Query: {
//     allArticles: async (root, args) => {
//       let conds = []
//       if (args.author_id) {
//         // TODO: authorisation/validation/who can see it?
//         // TODO: use context.currentUser
//         conds = [...conds, {author: args.author_id}]
//       } else {
//         throw new UserInputError("user_id must be provided", {
//           invalidArgs: args,
//         })
//       }
//
//       return Article.find(conds).populate('author')
//     }
//   }
// }

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async ({ req }) => {
//     const auth = req ? req.headers.authorization : null
//     if (auth && auth.toLowerCase().startsWith('bearer ')) {
//       const decodedToken = jwt.verify(
//         auth.substring(7), process.env.SECRET
//       )
//       const currentUser = await User.findById(decodedToken.id)
//       return {currentUser} // {currentUser:currentUser}
//     }
//   }
// })

// server.applyMiddleware({expressServer})

expressServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
