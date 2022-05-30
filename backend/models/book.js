const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  isbn: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  publishedDate: {
    type: Date,
  },
  publisher: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  updatedDate: {
    type: Date,
    dafault: Date.now,
  },
});

const Book = mongoose.model("Book", bookSchema);

exports.Book = Book;
