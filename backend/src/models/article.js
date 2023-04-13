const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

const url = config.MONGODB_URI; // needs to be configured in .env file

logger.info("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

const articleSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  title: {
    type: String,
    minLength: 3,
    required: true
  },
  abstract: {
    type: String,
    minLength: 3,
    required: false
  },
  content: {
    type: String,
    minLength: 30,
    required: true
  }
}, { timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  } });

articleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Article", articleSchema);