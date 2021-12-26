import { useEffect, useState } from 'react';
import axios from 'axios';
export const Location = () => {
    const [location, setLocation] = useState(null)
    let url;
    let rawCity;
    let city;
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                url = `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=4887bbf51ad64ea99d71b17f4d41e4ae`;
                axios.get(url)
                    .then(resp => {
                        setLocation(resp.data)
                    })
            });
        }
    }, [url])
    if (location) {
        rawCity = location.features[0].properties.city;
        city = rawCity.split(" ")[0];
    }
    return (
        city
    )

}       
