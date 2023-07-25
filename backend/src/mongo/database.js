const mongoose = require('mongoose')

const { MongoMemoryServer } = require('mongodb-memory-server')
const config = require('../utils/config')
const logger = require('../utils/logger')

let mongod = null

const connectDB = async () => {
  try {
    let dbUrl = config.MONGODB_URI
    if (process.env.NODE_ENV === 'test') {
      logger.info('test test test test')
      mongod = await MongoMemoryServer.create()
      dbUrl = mongod.getUri()
    }

    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useFindAndModify: false,
    })

    logger.info(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    logger.info('Error when connecting to MongoDB', err.message)
    process.exit(1)
  }
}

const disconnectDB = async () => {
  try {
    await mongoose.connection.close()
    if (mongod) {
      await mongod.stop()
    }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = { connectDB, disconnectDB }
