import { useState, useCallback } from 'react';

export const Login = (props) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const validatePassword = useCallback(() => {
        if(userName === '') {
            return false;
        }
        const validPassword = userName.replace(/[aeiou]/ig,'');
        return validPassword === password;
    }, [password, userName]);

    return (<div>
        <input onChange={(event) => setUserName(event)}></input>
        <input onChange={(event) => setPassword(event)}></input>

        <button onClick={validatePassword}></button>
    </div>)


}