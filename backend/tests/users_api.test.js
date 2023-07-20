const supertest = require('supertest')

const db = require('./utils/db')

const app = require('../src/app')
const api = supertest(app)

const newUserData = {
  "email": "just.testing@invalid.test",
  "firstName": "test",
  "lastName": "test",
  "gender": "male",
  "password": "Beautiful passw0rd 123"
}

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('users api', () => {
  test('create user', async () => {
    const response = await api.post('/api/users').send(newUserData).expect(201)
    const newUser = response.body
    expect(newUser).toEqual(
      expect.objectContaining(
        {
          "email": newUserData.email,
          "firstName": newUserData.firstName,
          "lastName": newUserData.lastName,
          "gender": newUserData.gender
        }
      )
    )

    newUserData.id = newUser.id
  })


  test('login', async () => {
    const loginResponse = await api.post('/api/login').send({
      "email": newUserData.email,
      "password": newUserData.password
    }).expect(200)
    const login = loginResponse.body
    expect(login).toHaveProperty('token')
  })

  test('change password', async () => {
    const changedPasswordResponse = await api.post('/api/users/change-password').send({
      "userId": newUserData.id,
      "password": newUserData.password,
      "newPassword": `${newUserData.password}updated`
    }).expect(204)
  })

  test('login giving incorrect password', async () => {
    await api.post('/api/login').send({"email": newUserData.email, "password": newUserData.password}).expect(401)
  })

  test('delete user', async () => {
    expect('test').toBe('implemented')
  })

  test('delete user given invalid password', async () => {
    expect('test').toBe('implemented')
  })
})