const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* GET all books ordered by title */
router.get('/', async (req, res, next) => {
  const books = await Book.findAll({
    order: [['title', 'ASC']]
  });
  res.render("index", { books });
});

// GET request for form to create new book
router.get('/new', async (req, res, next) => {
  res.render('new-book');
});

// To POST a new book
router.post('/new', async (req, res, next) => {
  try {
    const newBook = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year,
    })
    res.redirect('/');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors;
      const book = req.body;
      book.id = req.params.id;
      res.render('new-book', {errors, book});
    } else {
      res.render('error')
    }
  };
});

router.get('/:id', async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book === null) {
    res.render('error')
  } else {
    res.render('update-book', { book });
  }
});

// UPDATE action to edit a specific book in the form
router.post('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect('/books/' + book.id)
 } catch(error) {
   if (error.name === 'SequelizeValidationError') {
     const errors = error.errors;
     const book = await Book.findByPk(req.params.id);
     res.render('update-book', { book, errors });
   }
 }
});

// DELETE post for a selected book
router.post('/:id/delete', async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/');
});

module.exports = router;
