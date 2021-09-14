const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()


const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`  
  type Author {
    name: String!
    born: Int 
    bookCount: Int!
    id: ID!
  }
  input AuthorInput {
    name: String!
    born: Int 
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: AuthorInput!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!    
      setBornTo: Int!  
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`
const resolvers = { 
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {

      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author })
        if (foundAuthor) {
          if (args.genre) {
            return await Book.find({ author: foundAuthor.id, genres: { $in: [args.genre] } }).populate('author')
          }
          return  await Book.find({ author: foundAuthor.id }).populate('author')
        }
        return null
      }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }

      return Book.find({}).populate('author')

    },
    allAuthors: async () => await Author.find({})
  },

  Author: {    
    bookCount: async (root) => {
      const foundAuthor = await Author.findOne({ name: root.name })
      const foundBooks = await Book.find({ author: foundAuthor.id }) 
      return foundBooks.length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const foundBook = await Book.findOne({ title: args.title })
      const foundAuthor = await Author.findOne({ name: args.author.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (foundBook) {
        throw new UserInputError('Book already added', {
          invalidArgs: args.title,
        })
      }

      if (!foundAuthor) {
        const author = new Author({ ...args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const foundAuthor2 = await Author.findOne({ name: args.author.name })
      const book = new Book({ ...args, author: foundAuthor2 })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book

    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (!author) {
        return null
      }
  
      const filter = { name: args.name }
      const options = {}
      const updateDoc = {
        $set: {
          ...author, born: args.setBornTo
        },
  
      };

      await Author.updateOne(filter, updateDoc, options)
      return await Author.findOne({ name: args.name })
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})