const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const httpServer = http.createServer(app)
const PORT = config.PORT || 3001

httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
