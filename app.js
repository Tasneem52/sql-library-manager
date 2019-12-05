const express = require('express');
const app = express();
const path = require('path');

const routes = require('./routes/index');
const books = require('./routes/books');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

// Catch 404 and forward to error handler
app.use( (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('page-not-found');
});

module.exports = app;
