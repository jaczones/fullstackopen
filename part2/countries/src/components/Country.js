import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {

  const [{weather, temp, wind}, setWeather] = useState({weather: '', temp: '', wind: ''})

  useEffect(() => {
    const params = {
      q: country.capital,
      appid: process.env.REACT_APP_WEATHER_KEY
    }
    axios.get('https://api.openweathermap.org/data/2.5/weather', {params})
      .then(response => {
        console.log(response.data)
        const fTemp = parseFloat(response.data.main.temp)
        const finalTemp = Math.round(((fTemp - 273.15)*1.8) + 32)
        setWeather({
          weather: response.data.weather[0].main,
          temp: finalTemp,
          wind: response.data.wind.speed
        })
        //console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}`);
      }).catch(error => {
        console.log(error);
      });
  },[])

  return (
    <div>
      <h1>{country.name}</h1>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong></p>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="Country flag" width="30%" height="auto"></img>
      <h3><strong>Weather in {country.capital}</strong></h3>
      <p><strong>Temperature:</strong> {temp}°</p>
      <p><strong>Forecast:</strong> {weather}</p>
      <p><strong>Wind:</strong> {wind} MPH</p>
    </div>
  )
}

export default Country
