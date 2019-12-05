const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please specify a value for "title"',
        },
        notEmpty: {
          msg: 'Please provide a non empty value for "title"',
        },
      },
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please specify a value for "author"',
        },
        notEmpty: {
          msg: 'Please provide a non empty value for "author"',
        },
      },
    },
    genre: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.INTEGER,
    },
  }, {sequelize}
  );
  return Book;
}
