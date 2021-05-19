import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Search from './components/Search'
import Filter from './components/Filter'
import { findCountry } from './components/findCountry'


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const filteredSearch = findCountry(countries, searchTerm)
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Filter filteredSearch={filteredSearch} />
    </div>
  )
}


export default App;
