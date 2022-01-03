import { useEffect, useState } from 'react';
import axios from 'axios';
import { Location } from './Location';

export const Weather = () => {
    let weatherApi = null
    const location = Location();
    if (location) {
        weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,alerts&appid=fccd39a3e71f0487867379ec0acbc2cd`;
    } else {
        console.log("Location masih undifined");
    }
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        if (location != undefined) {
            axios.get(weatherApi)
                .then(resp => {
                    setWeather(resp.data)
                })

        } else {
            console.log("Gagal get API");
        }
    }, [weatherApi])

    if (weather) {
        return (
            {
                city: location.city,
                current: weather.current,
                forecast: weather.daily
            }
        )
    }

}
