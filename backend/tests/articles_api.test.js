// inspired by my exercise solution:
// https://github.com/drohal3/fullstackopen-part4/blob/main/bloglist-backend/tests/bloglist_api.test.js
const supertest = require('supertest')
const db = require('./utils/db')
const app = require('../src/app')

const api = supertest(app)

beforeAll(async () => await db.connect())
beforeEach(async () => await db.clear())
afterAll(async () => await db.close())

const newUserData = {
  email: 'just.testing@invalid.test',
  firstName: 'test',
  lastName: 'test',
  nickName: 'test01',
  gender: 'male',
  password: 'Beautiful passw0rd 123'
}

// TODO: ???
// const User = require('../src/mongo/models/user')
// const Article = require('../src/mongo/models/article')

const newArticle = {
  title: 'test article 1',
  abstract: 'test abstract, test abstract, test abstract, test abstract, test abstract,' +
    'test abstract, test abstract, test abstract, test abstract, test abstract, ',
  content: 'test content test content test content test content test content test content test content test content ' +
    'test content test content test content test content test content test content test content test content test content '
}

const userData = {
  email: 'test@test.test',
  firstName: 'test',
  lastName: 'test',
  password: 'test123',
  nickName: 'test01',
}

// remove article - should be removed also from user
// add article - should be added also to the user

describe('Article API', () => {
  let header
  beforeEach(async () => {
    const user = await api
      .post('/api/users')
      .send(userData)

    userData.id = user.body.id

    const login = await api
      .post('/api/login')
      .send({ email: userData.email, password: userData.password })

    header = {
      Authorization: `bearer ${login.body.token}`
    }
  })
  describe('POST /api/articles', () => {
    test('should create an article', async () => {
      await api.post('/api/articles').set(header).send(newArticle).expect(201)
    })
    test('unauthorized user should not create an article', async () => {
      await api.post('/api/articles').send(newArticle).expect(401)
    })
  })

  describe('GET /api/articles', () => {
    test('should return articles', async () => {
      const articles = await api.get('/api/articles').expect(200)
      expect(articles.body).toHaveLength(0)
      await api.post('/api/articles').set(header).send(newArticle)
      const newArticles = await api.get('/api/articles').expect(200)
      expect(newArticles.body).toHaveLength(1)
    })
  })

  describe('GET /api/articles/:id', () => {
    test('should return an article', async () => {
      const newArticleResponse = await api.post('/api/articles').set(header).send(newArticle)
      const newArticleId = newArticleResponse.body.id
      console.log(newArticleId)
      const article = await api.get(`/api/articles/${newArticleId}`).expect(200)
      const articleId = article.body.id

      expect(articleId).toEqual(newArticleId)
    })
  })

  describe('DELETE /api/articles/:id', () => {
    test('should delete article', async () => {
      const newArticleResponse = await api.post('/api/articles').set(header).send(newArticle)
      const articleId = newArticleResponse.body.id
      await api.delete(`/api/articles/${articleId}`).set(header).expect(204)
      await api.get(`/api/articles/${articleId}`).expect(404)
    })
    test('unauthorized user should not delete article', async () => {
      const newArticleResponse = await api.post('/api/articles').set(header).send(newArticle)
      const articleId = newArticleResponse.body.id
      await api.delete(`/api/articles/${articleId}`).expect(401)
    })
    test('not owner should not delete article', async () => {
      const newArticleResponse = await api.post('/api/articles').set(header).send(newArticle)
      const articleId = newArticleResponse.body.id

      const user2Data = {
        ...userData, email: 'test2@test.test'
      }
      const user = await api
        .post('/api/users')
        .send(user2Data)

      user2Data.id = user.body.id

      const login = await api
        .post('/api/login')
        .send({ email: user2Data.email, password: user2Data.password })

      const header2 = {
        Authorization: `bearer ${login.body.token}`
      }

      await api.delete(`/api/articles/${articleId}`).set(header2).expect(401)
    })
  })
})
