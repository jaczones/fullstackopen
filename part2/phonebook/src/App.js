import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Search from './components/Search'
import Filter from './components/Filter'
import { findPerson } from './components/findPerson'
import personService from './services/persons'

const App = (props) => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const filteredSearch = findPerson(persons, searchTerm)
  
  useEffect(() => {
    personService
      .getAll('http://localhost:3001/persons')
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  },[])

  const handleFormSubmission = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already in phonebook`)
    }else {
    personService
    .create(personObject)
    .then(returnedContacts => {
      setPersons(persons.concat(returnedContacts))
      setNewName('')
      setNewNumber('')
    })
  }}

  const handleNameSubmission = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberSubmission = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
        <Form handleFormSubmission={handleFormSubmission} newName={newName} newNumber={newNumber} handleNameSubmission={handleNameSubmission} handleNumberSubmission={handleNumberSubmission} />
      </div>
      <Filter filteredSearch={filteredSearch} />
    </div>
  )
}

export default App
