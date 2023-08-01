const Article = require('../mongo/models/article')
const User = require('../mongo/models/user')
const { GraphQLError } = require('graphql')
const { ApolloServerErrorCode } = require('@apollo/server/errors')

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
    allArticles(authorId: ID, articleId: ID): [Article!]!
  }
  
  type Mutation {
    createArticle(
      title: String!
      content: String!
      abstract: String
    ): Article!
    updateArticle(
      id: ID!
      title: String
      content: String
      abstract: String
    ): Article!
    deleteArticle(articleId: ID!): Article
  }
`

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      console.log('====>', context)
      return 'world'
    },
    allArticles: async (root, { authorId, articleId }, context) => {
      // TODO: authentication / errors
      let conditions = []
      if (authorId) {
        conditions = [...conditions, { author: authorId }]
        console.log('--->>>', authorId)
      }
      if (articleId) {
        conditions = [...conditions, { _id: articleId }]
      }

      conditions = conditions.length ? { $and: conditions } : {}

      console.log("====> conditions: ", conditions)

      const ret = await Article.find(conditions).populate('author')
      console.log("ret", ret)
      return ret
    }
  },

  Mutation: {
    createArticle: async (root, args, context) => {
      if (!context.user) {
        throw new GraphQLError('You are not authorized to perform this action.', {
          extensions: {
            code: 'FORBIDDEN'
          }
        })
      }

      console.log(context)
      const author = await User.findById(context.user._id)

      if (!author) {
        throw new GraphQLError('You are not authorized to perform this action.', {
          extensions: {
            code: 'FORBIDDEN'
          }
        })
      }

      const newArticle = new Article({
        title: args.title,
        abstract: args.abstract,
        content: args.content,
        author: author.id
      })

      let article = null

      try {
        article = await newArticle.save()
      } catch (e) {
        throw new GraphQLError(e.message, { // TODO: is this correct way to thro error?
          // TODO: https://www.apollographql.com/docs/apollo-server/data/errors/#custom-errors
          code: ApolloServerErrorCode.BAD_USER_INPUT
        })
      }

      return article.populate('author')
    },

    updateArticle: async (root, data, context) => {
      if (!context.user) {
        throw new GraphQLError('You are not authorized to perform this action.', {
          extensions: {
            code: 'FORBIDDEN'
          }
        })
      }

      const { id, title, abstract, content } = data

      console.log('data', data)
      const updatedArticle = await Article.findByIdAndUpdate(id, { title, abstract, content }, { new: true }).populate('author')

      return updatedArticle

      //   TODO: what if article is not found?
    },

    deleteArticle: async (root, { articleId }, context) => {
      if (!context.user) {
        throw new GraphQLError('You are not authorized to perform this action.', {
          extensions: {
            code: 'FORBIDDEN'
          }
        })
      }

      const article = await Article.findById(articleId)

      if (article.author.toString() !== context.user.id) {
        throw new GraphQLError('You are not authorized to perform this action.', {
          extensions: {
            code: 'FORBIDDEN'
          }
        })
      }

      return Article.findByIdAndDelete(articleId).populate('author')
    }
  }
}

module.exports = { typeDefs, resolvers }
