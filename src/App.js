import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Location } from './components/Location';


function App() {
  let city = Location();
  const [weather, setWeather] = useState(null);
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fccd39a3e71f0487867379ec0acbc2cd`;
  useEffect(() => {
    axios.get(weatherApi)
      .then(resp => {
        setWeather(resp.data)
      })
  }, [weatherApi])

  let temp_min;
  let temp_max;
  let temp;
  if (weather) {
    temp_min = weather.main.temp_min;
    temp_max = weather.main.temp_max;
    temp = ((temp_max + temp_min) - (2 * 273.15)) / 2;
    temp = Math.round(temp);
  }
  return (
    <div className="App">
      <main>
        {weather !== null ?
          <div>
            <h1>{weather.name}</h1>
            <h1>Suhu = {temp}</h1>
          </div>
          : ""
        }
      </main>
    </div>
  );
}

export default App;