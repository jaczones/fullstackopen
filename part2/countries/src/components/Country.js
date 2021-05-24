import React from 'react'
import showButton from './ShowButton'

const Country = ({ country }) => {
  return (
    <li>{country.name}</li>
  )
}

const FullCountry = ({ country }) => {
  return (
    <div>
    <h3>{country.name}</h3>
    <p>Capital: {country.capital}</p>
    <p>Population:{country.population}</p>
    <p>{country.languages.name}</p>
    <p><img src={country.flag} alt="flag" width="30%" height="auto"/></p>
    </div>
  )
}


const CountryWithButton = ({ country }) => {
  return (
    <li>{country.name} <button type="button"> show </button></li>
  )
}

export {
    Country,
    FullCountry,
    CountryWithButton
}
