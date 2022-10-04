import {useState, useCallback, useEffect} from 'react';

const Weather = (props) => {

    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [units, setUnits] = useState('');
    const [temperature, setTemperature] = useState(0);

    useEffect(() => {
        fetch('https://api.weather.gov/points/39.7456,-97.0892')
        .then((response) => response.json())
        .then((data) => {
            setCity(data.properties.relativeLocation.properties.city);
            setState(data.properties.relativeLocation.properties.state);
            return data.properties.forecast
        })
        .then((forecastUrl) => fetch(forecastUrl))
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setTemperature(data.properties.periods[0].temperature)
            setUnits(data.properties.periods[0].temperatureUnit)
        });
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

   return (<div>
        <span >City: {city}</span>
        <span >State: {state}</span>
        <span >Temperature: {temperature} º {units}</span>
        <button onClick={changeTemp}>Convert temp</button>
    </div>)

}

export default Weather;