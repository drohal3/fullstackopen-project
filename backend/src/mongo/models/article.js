const mongoose = require("mongoose");

const { connectDB } = require("../database")

// connectDB()

const articleSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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