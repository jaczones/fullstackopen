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
    const person = persons.find((p) => p.name === newName)
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if(person){
      alert(`${newName} is already in phonebook, replace the old number with a new one?`)
      personService
      .update(person.id, personObject)
      window.location.reload();
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

  const handleRemoveClick = id => {
    const person = persons.find(p => p.id === id)
    console.log(person)
    alert(`Delete ${person.name}?`)
    personService
    .remove(id)
    window.location.reload();
  }

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
        <Form handleFormSubmission={handleFormSubmission} newName={newName} newNumber={newNumber} handleNameSubmission={handleNameSubmission} handleNumberSubmission={handleNumberSubmission} />
      </div>
      <Filter filteredSearch={filteredSearch} handleRemoveClick={handleRemoveClick}/>
    </div>
  )
}

export default App
