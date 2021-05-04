import React from 'react'

const Form = ({handleFormSubmission, newName, newNumber, handleNameSubmission, handleNumberSubmission}) => {
    return (
        <>
        <h2>Add New</h2>
          <form onSubmit={handleFormSubmission}>
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
        </>
    )
}

export default Form