const mongoose = require('mongoose');

const booklistSchema = mongoose.Schema({
    isbn13: String,
    bookname: String,
    authorsname: String,
    read: Boolean,
    returned: Boolean,
    imagelink: String
})

module.exports.BookList = mongoose.model('books', booklistSchema, 'books');