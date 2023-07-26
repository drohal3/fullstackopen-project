// const bcrypt = require('bcrypt')
// const config = require('../utils/config')
const articlesRouter = require('express').Router()
const Article = require('../mongo/models/article')
const User = require('../mongo/models/user')

const populateAuthor = {
  id: 1,
  firstName: 1,
  lastName: 1,
  gender: 1,
  email: 1
}

const validateArticle = (article) => {
  if (article.title === undefined) {
    throw new Error('title is required')
  }

  if (article.content === undefined) {
    throw new Error('content is required')
  }
}

articlesRouter.get('/', async (request, response, next) => {
  // TODO: default limit for number of results / filter/ pagination.
  try {
    const articles = await Article.find({}).populate('author', populateAuthor)

    response.json(articles)
  } catch (error) {
    next(error)
  }
})

articlesRouter.get('/:id', async (request, response, next) => {
  try {
    const article = await Article.findById(request.params.id).populate('author', populateAuthor)

    if (!article) {
      return response.status(404).json({ error: 'article not found' })
    }

    return response.json(article)
  } catch (error) {
    next(error)
  }
})

articlesRouter.post('/', async (request, response, next) => {
  try {
    validateArticle(request.body)
  } catch (e) {
    return response.status(400).json({ error: e.message })
  }

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const articleData = { ...request.body, ...{ author: user.id } }
    const article = new Article(articleData)
    const newArticle = await article.save()
    const userToUpdate = await User.findById(user.id)
    userToUpdate.articles.concat(newArticle._id) // TODO: does this work?
    await userToUpdate.save()
    response.status(201).json(newArticle)
  } catch (e) {
    next(e)
  }
})

articlesRouter.put('/', async (request, response, next) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    // validateArticle(request.body)
  } catch (e) {
    return response.status(400).json({ error: e.message })
  }

  try {
    const article = await Article.findById(request.body.id)

    if (article.author.toString() !== user.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    // TODO: validate user
    const docs = await Article.updateOne({ _id: request.body.id }, request.body)
    response.send(docs)
  } catch (e) {
    next(e)
  }
})

articlesRouter.delete('/:id', async (request, response, next) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const article = await Article.findById(request.params.id)

    if (article) {
      if (article.author.toString() !== request.user.id.toString()) {
        return response.status(401).json({ error: 'unauthorized' })
      }

      const userToUpdate = await User.findById(user.id)
      userToUpdate.articles.filter(a => article.id !== a.id) // TODO: does this work?
      await article.deleteOne()
      await userToUpdate.save()
    }

    return response.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = articlesRouter
