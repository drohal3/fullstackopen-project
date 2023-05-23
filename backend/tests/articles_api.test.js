// inspired by my exercise solution:
// https://github.com/drohal3/fullstackopen-part4/blob/main/bloglist-backend/tests/bloglist_api.test.js

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/app')
const api = supertest(app)

const User = require('../src/mongo/models/user')
const Article = require('../src/mongo/models/article')

const initialArticles= [{

}]

afterAll(() => {
  mongoose.connection.close()
})

// remove article - should be removed also from user
// add article - should be added also to the user

describe('article api', () => {
  let header
  beforeEach(async () => {
    console.log("beforeEach")
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

    console.log("header ....",header)
  })

  test('return status 401 if token not provided', async () => {
    expect("a").toEqual("a")
    const newArticle = {
      "title": "test article 1",
      "abstract": "test abstract, test abstract, test abstract, test abstract, test abstract," +
        "test abstract, test abstract, test abstract, test abstract, test abstract, ",
      "content": "test content test content test content test content test content test content test content test content " +
        "test content test content test content test content test content test content test content test content test content "
    }

    await api.post('/api/articles').send(newArticle).expect(401)
  })
})