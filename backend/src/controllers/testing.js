const testingRouter = require('express').Router()
// const User = require("../models/user");

testingRouter.post('/reset', async (req, res) => {
  // await User.deleteMany({});

  res.status(204).end()
})

module.exports = testingRouter
