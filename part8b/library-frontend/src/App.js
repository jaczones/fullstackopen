import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from "@apollo/client"


const App = () => {
  const [page, setPage] = useState('authors')
  const authorsQuery = gql`
    query {
      allAuthors {
        name
        born
        bookCount
      }
    }
  `
  const booksQuery = gql`
    query {
      allBooks {
        title
        author
        published
      }
    }
  `
  const fetchedAuthors = useQuery(authorsQuery);
  const fetchedBooks = useQuery(booksQuery);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} fetchedAuthors={fetchedAuthors} 
      />

      <Books
        show={page === 'books'} fetchedBooks={fetchedBooks}
      />

      <NewBook
        show={page === 'add'}
        authorsQuery={authorsQuery}
        booksQuery={booksQuery}
      />

    </div>
  )
}

export default App