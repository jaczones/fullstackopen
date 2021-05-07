import React from 'react'
import { Country, FullCountry} from './Country'

const Filter = ({filteredSearch}) => {
    if (filteredSearch.length === 250) {
        return (
            <>
            Start typing to search countries...
            </>
        )
    }
    else if (filteredSearch === 1) {
        <>
        <ul>
            <FullCountry />
        </ul>
        </>
    }else if (filteredSearch.length > 1 || filteredSearch.length < 10){
        return (
            <>
            <ul>
                {filteredSearch.map(country => 
                <Country country={country} />
                )}
            </ul>
            </>
        )
        
    } else {
    return (
        <>
        <p>Too many matches, keep typing...</p>
        </>
    )
}
}

export default Filter