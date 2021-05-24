import React from 'react'
import { Country, FullCountry, CountryWithButton} from './Country'
import showButton from './ShowButton'

const Filter = ({filteredSearch}) => {
    if (filteredSearch.length === 250) {
        return (
            <>
            Start typing to search countries...
            </>
        )
    }
    else if (filteredSearch.length === 1) {
       return ( 
       <>
        <ul>
            {filteredSearch.map(country =>
            <FullCountry country={country}/>
            )}
        </ul>
        </>
       )
    }else if (filteredSearch.length > 1 && filteredSearch.length < 10){
        return (
            <>
                <div>
                    <ul>
                        {filteredSearch.map(country => 
                        <CountryWithButton country={country}/>
                        )}
                    </ul>
                </div>
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