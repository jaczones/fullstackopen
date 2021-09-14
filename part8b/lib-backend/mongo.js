const mongoose = require('mongoose')
require('dotenv').config()


const url = process.env.MONGODB_URI

mongoose.connect(url)

const bookSchema = new mongoose.Schema({
  title: String,
  published: Number,
  author: String,
  genres: [String]
})

const Book = mongoose.model('Book', bookSchema)

const book = new Book({
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution']
})

book.save().then(result => {
  console.log('book saved!')
  mongoose.connection.close()
})