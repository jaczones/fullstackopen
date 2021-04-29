import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  
  const addPerson = (event) => {
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
      <h2>Phonebook</h2>
        <div>
          <form onSubmit={addPerson}>
          <p>Name: <input
          value={newName} 
          onChange ={handleNameSubmission}
          placeholder="Enter a name..."
          /></p>
          Number: <input
          value={newNumber} 
          onChange ={handleNumberSubmission}
          placeholder="Enter a name..."
          />
          <p><button type="submit">add</button></p>
          </form>
        </div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App