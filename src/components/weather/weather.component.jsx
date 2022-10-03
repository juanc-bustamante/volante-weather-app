// https://api.weather.gov/points/39.7456,-97.0892

import {useState, useCallback, useEffect} from 'react';

export const Weather = (props) => {

    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [units, setUnits] = useState('');
    const [temperature, setTemperature] = useState(0);

    useEffect(() => {
        setCity('Test City');
        setState('Test State');
        setTemperature(80);
        setUnits('F')
    }, []);


    const changeTemp = useCallback(() => {
        if (units === 'F')
        {
            setUnits('C');
            setTemperature( (temperature - 32) * 0.5556);
        } else {
            setUnits('F');
            setTemperature( (temperature * 1.8) +32);
        } 
    }, [temperature, units]);

   return (<div>
        <span >City: `${city}`</span>
        <span >State: `${state}`</span>
        <span >Temperature: `${temperature} º ${units}`</span>
        <button onClick={changeTemp}></button>
    </div>)

}