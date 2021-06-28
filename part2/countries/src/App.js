import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/filter'

const App = () => {
  const [countries, setCountry] = useState([])
  const [filterName, setFiterName] = useState('')
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
  },[])

  const handleFilterChange = (event) => {
    setFiterName(event.target.value)
  }

  const filtered = countries.filter((country) =>
    country.name.toLowerCase().includes(filterName.toLowerCase())
  );

  // console.log(countries)

  return(
    <div>
      find countries <input value = {filterName}
          onChange = {handleFilterChange}/>
    <div>
      <Filter filtered = {filtered} filterName = {filterName}
        setFilterName = {setFiterName}
        weather = {weather}
        setWeather = {setWeather} />
    </div>
    
      
    </div>
    
  )
}

export default App;
