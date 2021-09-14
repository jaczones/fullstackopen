import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery, useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS } from './queries'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

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

  if (result.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }
  

  return (
    <div>
      <button onClick={logout}>
        logout
      </button>
      <Notify errorMessage={errorMessage} />
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