// inspired by my exercise solution:
// https://github.com/drohal3/fullstackopen-part4/blob/main/bloglist-backend/tests/bloglist_api.test.js
const supertest = require('supertest');
const db = require('./utils/db');
const app = require('../src/app');

const api = supertest(app);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

const newUserData = {
  "email": "just.testing@invalid.test",
  "firstName": "test",
  "lastName": "test",
  "gender": "male",
  "password": "Beautiful passw0rd 123"
}

const User = require('../src/mongo/models/user')
const Article = require('../src/mongo/models/article')

const initialArticles= [{
  "title": "initial article 1",
  "abstract": "test abstract, test abstract, test abstract, test abstract, test abstract," +
    "test abstract, test abstract, test abstract, test abstract, test abstract, ",
  "content": "test content test content test content test content test content test content test content test content " +
    "test content test content test content test content test content test content test content test content test content "
}]

const newArticle = {
  "title": "test article 1",
  "abstract": "test abstract, test abstract, test abstract, test abstract, test abstract," +
    "test abstract, test abstract, test abstract, test abstract, test abstract, ",
  "content": "test content test content test content test content test content test content test content test content " +
    "test content test content test content test content test content test content test content test content test content "
}

// remove article - should be removed also from user
// add article - should be added also to the user

describe('articles api', () => {
  let header
  beforeEach(async () => {
    const userData = {
      email: "test@test.test",
      firstName: "test",
      lastName: "test",
      gender: "male",
      password: "test123"
    }
    await api
      .post('/api/users')
      .send(userData)

    const login = await api
      .post('/api/login')
      .send({email: userData.email, password: userData.password})

    header = {
      'Authorization': `bearer ${login.body.token}`
    }
  })

  test('not given token', async () => {
    await api.post('/api/articles').send(newArticle).expect(401)
  })

  test('return status 201 and create article when article created', async () => {
    const savedArticle = await api.post('/api/articles').set(header).send(newArticle).expect(201)
    const retArticle = await api.get(`/api/articles/${savedArticle.body.id}`).expect(200)

    expect(savedArticle.body.id).toBe(retArticle.body.id)
  })

  test('remove article', async () => {
    const savedArticle = await api.post('/api/articles').set(header).send(newArticle).expect(201)
    const veryLikelyInvalidID = "6470aedff2a04acc4ed8dfc8"
    await api.delete(`/api/articles/${veryLikelyInvalidID}`).set(header).expect(204)
    await api.get(`/api/articles/${savedArticle.body.id}`).expect(200)
    await api.delete(`/api/articles/${savedArticle.body.id}`).set(header).expect(204)
    await api.get(`/api/articles/${savedArticle.body.id}`).expect(404)

    // const author = await api.get(`/api/users/${savedArticle.body.author}`).expect(200)
  })

  test('remove article without giving a token', async () => {
    const savedArticle = await api.post('/api/articles').set(header).send(newArticle).expect(201)
    await api.delete(`/api/articles/${savedArticle.body.id}`).expect(401)
  })

  test('update article', async () => {
    const savedArticle = await api.post('/api/articles').set(header).send(newArticle).expect(201)
    const updatedArticleTitle = "updated title 1234"
    const updatedArticleData = {
      id: savedArticle.body.id,
      title: updatedArticleTitle
    }

    await api.put('/api/articles').set(header).send(updatedArticleData).expect(200)

    const updatedArticle = await api.get(`/api/articles/${savedArticle.body.id}`).expect(200)

    expect(updatedArticle.body.title).toBe(updatedArticleTitle)
    expect(updatedArticle.body.content).toBe(newArticle.content)

  })

  test('update article', async () => {
    const savedArticle = await api.post('/api/articles').set(header).send(newArticle).expect(201)
    const updatedArticleTitle = "updated title 1234"
    const updatedArticleData = {
      id: savedArticle.body.id,
      title: updatedArticleTitle
    }

    await api.put('/api/articles').set(header).send(updatedArticleData).expect(200)

  })

  test('update article without giving a token', async () => {
    const savedArticle = await api.post('/api/articles').set(header).send(newArticle).expect(201)
    const updatedArticleTitle = "updated title 1234"
    const updatedArticleData = {
      id: savedArticle.body.id,
      title: updatedArticleTitle
    }

    await api.put('/api/articles').send(updatedArticleData).expect(401)
  })
})