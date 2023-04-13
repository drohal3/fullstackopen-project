const bcrypt = require("bcrypt");
const config = require('../utils/config')
const articlesRouter = require("express").Router();
const Article = require("../models/article");
const User = require('../models/user');

articlesRouter.get("/", async (request, response, next) => {
  try {
    const articles = await Article.find({}).populate("author", {
      username: 1,
      name: 1,
      id: 1,
    });

    response.json(articles);
  } catch (error) {
    next(error);
  }
});

articlesRouter.get("/:id", async (request, response, next) => {
  try {
    const article = await Article.findById(request.params.id).populate("author", {
      username: 1,
      name: 1,
      id: 1,
    });

    if (!article) {
      return response.status(404).json({ error: "article not found" });
    }

    return response.json(article);
  } catch (error) {
    next(error);
  }
});

articlesRouter.post('/', async (request, response, next) => {
  if (request.body.title === undefined) {
    return response.status(400).json({ error: "title is required" });
  }

  if (request.body.content === undefined) {
    return response.status(400).json({ error: "content is required" });
  }

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  try {
    const articleData = { ...request.body, ...{ author: user.id } };
    const article = new Article(articleData);
    const newArticle = await article.save();
    const userToUpdate = await User.findById(user.id);
    console.log("userToUpdate", userToUpdate)
    userToUpdate.articles.concat(newArticle._id) //TODO: id or _id?
    await userToUpdate.save();
    response.status(201).json(newArticle);
  } catch (e) {
    next(e);
  }
});

articlesRouter.delete("/:id", async (request, response, next) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  try {
    const article = await Article.findById(request.params.id);

    if (article) {
      if (article.author.toString() !== request.user.id.toString()) {
        return response.status(401).json({ error: "unauthorized" });
      }

      await article.deleteOne();
    }

    return response.status(204).end();

  } catch (e) {
    next(e);
  }
});

module.exports = articlesRouter;