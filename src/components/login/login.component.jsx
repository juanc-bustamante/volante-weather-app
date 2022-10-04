import { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import './login.styles.scss'

const Login =  (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validatePassword = useCallback(() => {
        if(username === '') {
            setErrorMessage('You must enter a non-empty username');
            return;
        }
        const validPassword = username.replace(/[aeiou]/ig,'');
        if (validPassword === password) {
            setErrorMessage('');
            navigate('/weather');
        } else {
            setErrorMessage('Password incorrect. Please try again.');
        }
    }, [password, username, navigate]);

    return (<div className="login">
        <div  className="login-div"/>
        <div  className="login-form">
            <input placeholder="Username" className="login-input"onChange={(event) => setUsername(event.target.value)}></input>
            { errorMessage !== '' && <span className='login-error'>{errorMessage}</span>}
            <input placeholder="Password" className="login-input"type="password" onChange={(event) => setPassword(event.target.value)}></input>
            <button onClick={validatePassword} className="login-button">Login</button>
        </div>
    </div>)

}

export default Login;