const axios = require('axios');
const Book = require('../models/Book');
const Trade = require('../models/Trade');

const {formatBookResponse} = require('../helpers');

// getting all the books from the database
exports.getBooks = function(req, res, next) {
    Book.find({})
        .then((books) => res.send(books))
}

// adding a book to the database
exports.addBook = function(req, res, next) {
    const bookTitle = req.body.book;

    axios.get(`https://www.googleapis.com/books/v1/volumes?maxResults=1&q=${bookTitle}`)
        .then((response) => {
            const book = new Book(formatBookResponse(response.data));
            book.owner = req.user.username;
            book.save()
                .then((book) => {
                     res.send(book);
                });
        })
}

// remove a book from the database
exports.deleteBook = function(req, res, next) {
    const {id} = req.params;
    const user = req.user.username;

    Book.findByIdAndRemove(id)
        .then(() => {
            res.send('Deleted');
        });
}

