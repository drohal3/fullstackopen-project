const mongoose = require('mongoose')

// const { connectDB } = require('../database')

// connectDB()

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minLength: 6,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  nickName: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  gender: {
    type: String,
    required: false
  },
  passwordHash: String,
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.passwordHash
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)
