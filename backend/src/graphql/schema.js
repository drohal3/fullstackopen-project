const Article = require('../mongo/models/article')

const typeDefs = `#graphql
  type User {
    nickName: String!
    id: ID!
  }
  
  type Article {
    author: User
    title: String!
    content: String!
    abstract: String
    id: ID!
  }
  
  type Query {
    hello: String
    allArticles(authorId: ID!): [Article!]!
  }
`

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      console.log('====>', context)
      return 'world'
    },
    allArticles: async (root, args, context) => {
      // TODO: authentication / errors
      let conditions = []
      if (args.authorId) {
        conditions = [...conditions, { author: args.authorId }]
        console.log('--->>>', args.authorId)
      }

      conditions = conditions.length ? { $and: conditions } : {}

      return Article.find(conditions).populate('author')
    }
  }
}

module.exports = { typeDefs, resolvers }
