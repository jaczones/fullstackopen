import React from 'react'
import { useQuery  } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BornForm from './BornForm'

const Authors = ({show}) => {
  const authors = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (authors.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BornForm  allAuthors={authors.data.allAuthors}/>
    </div>
  )
}

export default Authors