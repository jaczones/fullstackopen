const mongoose = require('mongoose')
require('dotenv').config()


const url = process.env.MONGODB_URI

mongoose.connect(url)

const userSchema = new mongoose.Schema({
  username: String,
  favoriteGenre: String
})

const User = mongoose.model('User', userSchema)

const user = new User({
    username: 'Zachariah',
    favoriteGenre: 'Sports'
})

user.save().then(result => {
  console.log('user saved!')
  mongoose.connection.close()
})