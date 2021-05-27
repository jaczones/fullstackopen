import React from 'react'

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong></p>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="Country flag" width="30%" height="auto"></img>
    </div>
  )
}

export default Country
