import './App.css';
import React from 'react';
import { Weather } from './components/Weather';
import weatherIcons from './Assets/weather-icons.svg';


function App() {
  const weather = Weather();
  console.log(weather);
  // ### Date ###
  const date = new Date();
  const year = date.getUTCFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getMonth()];
  const numberDate = date.getDate();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[date.getDay()];

  // ### CurrentWeather ###
  let currentTemp = null;
  let description = null;
  let city = null;
  if (weather) {
    currentTemp = Math.floor(weather.current.temp - 273.15);
    description = weather.current.weather[0].description;
    city = weather.city
  }

  // ### ForecastWeather ###

  // weather-icons
  const icons = {
    "03d": ["100px", "0px"],
    "10d": ["300px", "300px"]
  }
  let forecastWeathers = null;
  if (weather) {
    forecastWeathers = weather.forecast.slice(1, 6).map((forecastWeather, index) => {
      let x = icons[(forecastWeather.weather[0].icon)][0];
      let y = icons[(forecastWeather.weather[0].icon)][1];
      // console.log(icons[(t[index])][1]);
      // let x = icons[(t[index])][0];
      // let y = icons[(t[index])][1];
      return (
        <div className={`forecast-weather ${(index >= 3) ? 'upper-700' : ''}`} key={`after-current-${index + 1}`} id={`after-current-${index + 1}`} >
          <div className="weather-icons">
            <img className='weather-icon' src={weatherIcons} alt=""
              style={
                {
                  right: x,
                  bottom: y
                }
              } />
          </div>
          <h2 className='forecast-day'>{(date.getDay() + index + 1) >= 7 ? days[date.getDay() + index + 1 - 7] : days[date.getDay() + index + 1]}</h2>
          <p className='forecast-temp'>{Math.floor(forecastWeather.temp.day - 273.15)}&#176;C</p>
        </div>
      )
    })
  }


  return (
    <main>
      {weather ?
        <div className="container container-flex">
          <div className="location-date">
            <h1 className='location'>{city}</h1>
            <p className='date'>{`${day}, ${month} ${numberDate}, ${year}`}</p>
          </div>
          <div className='current-weather'>
            <h1 className='current-temp'>{currentTemp}&#176;C</h1>
            <p className='current-desc'>{weather.current.weather[0].description}</p>
          </div>
          <div className='forecast-weathers'>
            {forecastWeathers}
          </div>
        </div>
        : "Loading :D"
      }
    </main>

  );
}
export default App;