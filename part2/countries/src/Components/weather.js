import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config.json'
const Weather = ({country, weather, setWeather}) => {

    const api_key = config.YOUR_ACCESS_KEY
    
    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current', {
                params: {
                    access_key: api_key,
                    query: country.capital,
                    units: 'm'
                }
            })
            .then(response =>{
                console.log(response.data)
                setWeather(response.data.current)
            }).catch(error => {
                console.log(error);
            })
    },[api_key, country.capital])

    return(
        <div>
            <h2>Weather in {country.capital}</h2>
            <b>temperature:</b> {weather.temperature}<br />
            <img src = {weather.weather_icons} alt = 'weather icon'></img><br />
            <b>wind:</b> {weather.wind_speed} direction {weather.wind_dir}
        </div>
    )
}


export default Weather