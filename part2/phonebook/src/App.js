import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
    }
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already in phonebook`)
    } else {
    setPersons(persons.concat(personObject))
    setNewName('')
    }
  }

  const handleSubmission = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          <form onSubmit={addPerson}>
          Name: <input
          value={newName} 
          onChange ={handleSubmission}
          placeholder="Enter a name..."
          />
          <button type="submit">add</button>
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