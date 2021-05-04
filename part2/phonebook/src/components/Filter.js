import React from 'react'
import Person from './Person'

const Filter = ({filteredSearch}) => {
    return (
        <>
        <h2>Numbers</h2>
        <ul>
            {filteredSearch.map(person => 
            <Person key={person.id} person={person} />
            )}
        </ul>
        </>
    )
}

export default Filter