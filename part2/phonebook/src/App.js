import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Search from './components/Search'
import Filter from './components/Filter'
import { findPerson } from './components/findPerson'
import personService from './services/persons'
import Notification from './components/Notification'

const App = (props) => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const filteredSearch = findPerson(persons, searchTerm)
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
      .catch(error => {
      console.log("Error fetching list")
      setNotificationMessage({
        error: `${error} fetching list`
      });
      setTimeout(() => {
      setNotificationMessage(null)
      }, 5000)
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
      setNotificationMessage({
        notification: `'${person.name}' was successfully updated`
      })
      setTimeout(() => {
        setNotificationMessage(null)
        window.location.reload()
      },5000)
    }else {
      personService
      .create(personObject)
    .then(returnedContacts => {
      setNotificationMessage({
       notification: `An entry for '${personObject.name}' was successfully created`
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setPersons(persons.concat(returnedContacts))
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      setNotificationMessage({
          error: `Error adding ${newName}`
        });
      setTimeout(() => {
      setNotificationMessage(null)
      }, 5000)
  })
}
  }

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
    .then(response => {
      console.log(response)
      window.location.reload();
      })
    .catch(error => {
      setNotificationMessage({
        error: `${error} caused contact removal to fail, try again later.`
      })
    })
  }

  return (
    <div>
      <Notification 
      message={
        notificationMessage?.notification || notificationMessage?.error
        }
        className={notificationMessage?.notification ? "success" : "error"} 
        />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
        <Form handleFormSubmission={handleFormSubmission} newName={newName} newNumber={newNumber} handleNameSubmission={handleNameSubmission} handleNumberSubmission={handleNumberSubmission} />
      </div>
      <Filter filteredSearch={filteredSearch} handleRemoveClick={handleRemoveClick}/>
    </div>
  )
}

export default App
