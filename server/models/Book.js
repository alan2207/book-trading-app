const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title: String,
    authors: [String],
    pageCount: Number,
    image: String,
    date: String,
    owner: {
        type: String,
        required: true
    }
});



const Book = mongoose.model('Book', bookSchema);

module.exports = Book;