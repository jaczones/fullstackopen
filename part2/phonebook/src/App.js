import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredSearch = persons.filter(person =>{
    return person.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <p>Filtered Search <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      />
      </p>
      <h2>Add New</h2>
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
        {filteredSearch.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App