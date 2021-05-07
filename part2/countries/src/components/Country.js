import React from 'react'

const Country = ({ country }) => {
  return (
    <li>{country.name}</li>
  )
}

const FullCountry = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>{country.capital}</p>
            <p>{country.population}</p>
            <p>{country.languages.name}</p>
            <p>{country.flag}</p>
        </div>
    )
}

export {
    Country,
    FullCountry,
}