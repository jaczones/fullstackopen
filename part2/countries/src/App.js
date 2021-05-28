import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, FilterLogic } from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [weather, setWeather] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_WEATHER_KEY,
      query: 'France'
    }
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        console.log(response)
        const apiResponse = response.data;
        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
      }).catch(error => {
        console.log(error);
      });
  })
  

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (newFilter) {
      const regex = new RegExp( newFilter, 'i' );
      const filteredCountries = () => allCountries.filter(country => country.name.match(regex))
      setCountries(filteredCountries)
    }
  }

  const handleResetClick = (event) => {
    setCountries([])
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