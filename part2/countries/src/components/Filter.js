import React from 'react'
import Country from './Country'

const Filter = ({value, onChange, handleResetClick}) =>
    <div>
        <p>
        Find countries: <input value={value} onChange={onChange}/>
        <button onClick={handleResetClick} > reset </button>
        </p>
    </div>

const FilterLogic = ({countries, setCountries}) => {
    if (countries.length > 10) {
        return (
          <p>
            Too many matches, keep typing
          </p>
        )
    } else if ((countries.length > 2 && countries.length < 10)) {
        return (
          <ul>
            {countries.map((country, i) =>
              <li key={i}> {country.name} <button onClick={() => setCountries([country])}>show</button></li>
            )}
          </ul>
        )
    } else if ((countries.length === 0))
        return(
            <p>
                Type the name of a country
            </p>
        )
     else {
        return (
          <Country country={countries[0]}/>
        )
    }
  }

export {
    Filter,
    FilterLogic}