const bcrypt = require("bcrypt");
const config = require('../utils/config')
const usersRouter = require("express").Router();
const User = require("../models/user");

const getPasswordHash = async (password) => {
  const salt = 10;

  return await bcrypt.hash(password, salt)
}

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

  const passwordHash = await getPasswordHash(password);

  try {
    const user = new User({ email, firstName, lastName, gender, passwordHash });
    const newUser = await user.save();

    response.status(201).json(newUser); // TODO: should remove passwordHash?
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate username
      return response.status(422).json({ error: "User already exist!" });
    }

    next(error);
  }
});

usersRouter.post('/change-password', async (request, response, next) => {
  const { userId, password, newPassword } = request.body;

  const user = await User.findById(userId)

  if (!user) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);


  if (!passwordCorrect) {
    return response.status(401).json({
      error: "Unauthorized"
    });
  }

  user.passwordHash = await getPasswordHash(newPassword)
  user.save()

  return response.status(204).end()
})

usersRouter.delete("/:id", async (request, response, next) => {
  try {
    await User.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;