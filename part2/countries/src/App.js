import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, FilterLogic } from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (newFilter) {
      const regex = new RegExp( newFilter, 'i' );
      const filteredCountries = () => allCountries.filter(country => country.name.match(regex))
      setCountries(filteredCountries)
    }
  }

  const handleResetClick = (event) => {
    event.preventDefault()
    setNewFilter('')
  }
  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} handleResetClick={handleResetClick} />
      <FilterLogic countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App