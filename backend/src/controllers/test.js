const testRouter = require("express").Router();

testRouter.get('/', async (req, res) => {
  res.send({status: 'ok'});
});

module.exports = testRouter;