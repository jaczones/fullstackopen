import React from 'react'
import Country from './Country'

const Filter = ({filteredSearch}) => {
    return (
        <>
        <ul>
            {filteredSearch.map(country => 
            <Country country={country} />
            )}
        </ul>
        </>
    )
}

export default Filter