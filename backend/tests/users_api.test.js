const supertest = require('supertest')
const db = require('./utils/db')
const app = require('../src/app')

const api = supertest(app)

const newUserData = {
  email: 'just.testing@invalid.test',
  firstName: 'test',
  lastName: 'test',
  gender: 'male',
  password: 'Beautiful passw0rd 123'
}

beforeAll(async () => await db.connect())
beforeEach(async () => {
  await db.clear()
})
afterAll(async () => await db.close())

describe('User API', () => {
  describe('POST /api/users', () => {
    test('should create an user', async () => {
      const response = await api.post('/api/users').send(newUserData).expect(201)
      const newUser = response.body
      expect(newUser).toEqual(
        expect.objectContaining(
          {
            email: newUserData.email,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            gender: newUserData.gender
          }
        )
      )

      newUserData.id = newUser.id
    })
  })

  describe('POST /api/login', () => {
    test('should return a token', async () => {
      await api.post('/api/users').send(newUserData)
      const loginResponse = await api.post('/api/login').send({
        email: newUserData.email,
        password: newUserData.password
      }).expect(200)
      const login = loginResponse.body
      expect(login).toHaveProperty('token')
    })
  })

  describe('POST /api/users/change-password', () => {
    test('should change the password', async () => {
      await api.post('/api/users').send(newUserData)
      const login = await api.post('/api/login').send({
        email: newUserData.email,
        password: newUserData.password
      })
      const header = {
        Authorization: `bearer ${login.body.token}`
      }

      await api.post('/api/users/change-password').set(header).send({
        currentPassword: newUserData.password,
        newPassword: `${newUserData.password}updated`
      }).expect(204)

      await api.post('/api/login').send({
        email: newUserData.email,
        password: newUserData.password
      }).expect(401)

      await api.post('/api/login').send({
        email: newUserData.email,
        password: `${newUserData.password}updated`
      }).expect(200)
    })
  })

  describe('DELETE /api/users/:id', () => {
    test('only authorized user should be deleted', async () => {
      const user = await api.post('/api/users').send(newUserData)
      const login = await api.post('/api/login').send({
        email: newUserData.email,
        password: newUserData.password
      })

      const header = {
        Authorization: `bearer ${login.body.token}`
      }

      await api.delete(`/api/users/${user.body.id}`).set(header).send({
        password: 'invalid password'
      }).expect(401)

      await api.delete(`/api/users/${user.body.id}`).send({
        password: newUserData.password
      }).expect(401)

      await api.delete(`/api/users/${user.body.id}`).set(header).send({
        password: newUserData.password
      }).expect(204)
    })
  })

//   TODO: GET /api/users/:id
})
