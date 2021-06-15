import React from 'react'

const Person = ({ person, handleRemoveClick }) => {
  return (
    <li>{person.name} {person.number} <button onClick={handleRemoveClick}>delete</button></li>
  )
}

export default Person