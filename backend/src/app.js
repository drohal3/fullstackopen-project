const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// routers
const testRouter = require('./controllers/test')
const usersRouter = require('./controllers/users')
const loginRouter = require("./controllers/login");


app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use('/api/test', testRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;