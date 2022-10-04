import { useState, useCallback, useEffect } from 'react';
import './weather.styles.scss';

const Weather = (props) => {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [units, setUnits] = useState('');
    const [temperature, setTemperature] = useState(0);

    //39.7456,-97.0892

    const fetchWeather = (geolatitude, geolongitude) => {
        fetch(`https://api.weather.gov/points/${geolatitude},${geolongitude}`)
        .then((response) => response.json())
        .then((data) => {
            setCity(data.properties.relativeLocation.properties.city);
            setState(data.properties.relativeLocation.properties.state);
            return data.properties.forecast
        })
        .then((forecastUrl) => fetch(forecastUrl))
        .then((response) => response.json())
        .then((data) => {
            setTemperature(data.properties.periods[0].temperature);
            setUnits(data.properties.periods[0].temperatureUnit);
        })
        .catch(() => alert(`Error fetching the weather for location: ${geolatitude},${geolongitude}`));
    };

    useEffect(() => {
        if (!navigator.geolocation) {
             alert('Geolocation is not supported by your browser');
         } else {
             navigator.geolocation.getCurrentPosition((position) => {
                 const geolatitude  = position.coords.latitude;
                 const geolongitude = position.coords.longitude;
                 fetchWeather(geolatitude, geolongitude)
             }, () => alert('Unable to retrieve your location'));
         }
     }, []);


    const changeTemp = useCallback(() => {
        if (units === 'F')
        {
            setUnits('C');
            setTemperature( Math.round((temperature - 32) * 0.5556));
        } else {
            setUnits('F');
            setTemperature( Math.round((temperature * 1.8) +32));
        } 
    }, [temperature, units]);

   return (<div className="weather">
        <div  className="coordinates-form">
            <input placeholder="Latitude"  onChange={(event) => setLatitude(event.target.value)}></input>
            <input placeholder="Longitude" onChange={(event) => setLongitude(event.target.value)}></input>
            <button onClick={() => fetchWeather(latitude, longitude)}>Fetch Weather</button>
        </div>
        <span className="weather-label">City: {city}</span>
        <span className="weather-label">State: {state}</span>
        <span className="weather-label">Temperature: {temperature} º {units}</span>
        <button onClick={changeTemp} className="weather-button">Convert temp</button>
    </div>)

}

export default Weather;