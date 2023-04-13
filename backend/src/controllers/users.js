const bcrypt = require("bcrypt");
const config = require('../utils/config')
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response, next) => {
  // if (config.NODE_ENV !== "development") {
  //   return response.status(404).send({ error: "unknown endpoint" });
  // }

  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response, next) => {
  const { email, firstName, lastName, gender, password } = request.body;

  if (password === undefined || password.length < 3) {
    return response
      .status(400)
      .json({ error: "The password must be at least 3 characters long." });
  }

  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const user = new User({ email, firstName, lastName, gender, passwordHash });
    const newUser = await user.save();
    response.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate username
      return response.status(422).json({ error: "User already exist!" });
    }

    next(error);
  }
});

usersRouter.delete("/:id", async (request, response, next) => {
  try {
    await User.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;