import { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

const Login =  (props) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validatePassword = useCallback(() => {
        if(userName === '') {
            console.log(false);
        }
        const validPassword = userName.replace(/[aeiou]/ig,'');
        if(validPassword === password) {
            navigate('/weather');
        }
        console.log(validPassword)
        console.log(validPassword === password);
    }, [password, userName, navigate]);

    return (<div>
        <input placeholder="Username" onChange={(event) => setUserName(event.target.value)}></input>
        <input placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)}></input>

        <button onClick={validatePassword}>Login</button>
    </div>)

}

export default Login;