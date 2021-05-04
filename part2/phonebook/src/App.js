import React, { useState } from 'react'
import Form from './components/Form'
import Search from './components/Search'
import Filter from './components/Filter'
import { findPerson } from './components/findPerson'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const filteredSearch = findPerson(persons, searchTerm)
  
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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    }
  }

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
