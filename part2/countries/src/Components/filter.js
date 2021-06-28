import React, { useState, useEffect } from 'react'
import Weather from './weather'
const Filter = ({filtered, filterName, setFilterName, weather, setWeather}) => {
    if(filtered.length === 1){
        let country = filtered[0]
        return(
            <div>
                <h1>{country.name}</h1>
                <div>
                    capital {country.capital} <br />
                    population {country.population} <br />
                </div>
                <div>
                    <h2>languages</h2>
                    {country.languages.map((language) => (
                        <li key = {language.name} {...language}>
                            {language.name}
                        </li>
                    ))}
                </div>
                <img src = {country.flag} alt = "flag" width = "120" />
                <Weather country = {country} weather = {weather} setWeather = {setWeather} />
            </div>
        )
    }
    if(filtered.length > 10){
      return(
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
    else{
      return(
        <div>
        {filtered.map((country) => (
          <p key={country.name} {...country}>
            {country.name}
            <button onClick = {() => setFilterName(country.name)}>Show</button>
          </p>
        ))}
        </div>
      )
    }
  }
  
  export default Filter