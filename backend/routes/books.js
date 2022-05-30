const { Book } = require("../models/book");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort("title");
    res.send(books);
  } catch (error) {
    res.status(404).send("No book found.");
  }
});

router.post("/", async (req, res) => {
  // console.log(req.body);
  try {
    const book = new Book({
      title: req.body.title,
      isbn: req.body.isbn,
      author: req.body.author,
      description: req.body.description,
      publishedDate: new Date(req.body.publishedDate),
      publisher: req.body.publisher,
    });
    await book.save();

    res.send(book);
  } catch (error) {
    res.status(400).send("Unable to add this book.");
  }
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      isbn: req.body.isbn,
      author: req.body.author,
      description: req.body.description,
      publishedDate: new Date(req.body.publishedDate),
      publisher: req.body.publisher,
    },
    { new: true }
  );

  if (!book) res.status(400).send("The book with the given ID was not found.");

  res.send(book);
});

router.delete("/:id", async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book)
    return res.status(400).send("The book with the given ID was not found.");

  res.send(book);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book)
    return res.status(400).send("The book with the given ID was not found");

  res.send(book);
});

module.exports = router;
