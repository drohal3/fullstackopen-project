const bcrypt = require("bcrypt");
const config = require('../utils/config')
const usersRouter = require("express").Router();
const User = require("../mongo/models/user");

const getPasswordHash = async (password) => {
  const salt = 10;

  return await bcrypt.hash(password, salt)
}

usersRouter.get("/", async (request, response, next) => {
  // TODO: only admins should be allowed to browse users
  response.status(401).json({ error: "Unauthorized" })
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id)
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }

    return response.json(user);
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

    response.status(201).json(newUser); // TODO: how about returning ID only?
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate username
      return response.status(422).json({ error: "User already exist!" });
    }

    next(error);
  }
});

usersRouter.post('/change-password', async (request, response, next) => {
  const { currentPassword, newPassword } = request.body;

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  const passwordCorrect = await bcrypt.compare(currentPassword, user.passwordHash);


  if (!passwordCorrect) {
    return response.status(401).json({
      error: "Unauthorized"
    });
  }

  user.passwordHash = await getPasswordHash(newPassword)
  await user.save()

  return response.status(204).end()
  //   TODO: log out user after changing password / invalidate token - blacklist?
})


usersRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = await request.user
    const passwordCorrect = user && await bcrypt.compare(request.body.password, user.passwordHash);
    if (!user || !passwordCorrect || user.id !== request.params.id) {
      return response.status(401).json({
        error: "Unauthorized"
      });
    }
    await User.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;