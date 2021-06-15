import React from 'react'
import Person from './Person'

const Filter = ({filteredSearch, handleRemoveClick}) => {
    return (
        <>
        <h2>Numbers</h2>
        <ul>
            {filteredSearch.map(person => 
            <Person 
            key={person.id} 
            person={person} 
            handleRemoveClick={() => handleRemoveClick(person.id)}/>
            )}
        </ul>
        </>
    )
}

export default Filter