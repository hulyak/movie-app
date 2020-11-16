import React, {useState, useContext} from 'react';
// navigate programmatically
import {useNavigate} from 'react-router-dom';
import API from '../../API';
import Button from '../Button';
import {Wrapper } from './StyledLogin.js';

import {Context} from '../../context';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const [_user, setUser]= useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError(false);
        // success login
        try {
            const requestToken = await API.getRequestToken();
            const sessionId = await API.authenticate(requestToken, username, password);
            // context
            setUser({sessionId : sessionId.session_id , username});

            navigate('/'); // home page
         }catch(err) {
            setError(true);
        }
    }

    const handleInput = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        if(name === 'username') setUsername(value);
        if(name === 'password') setPassword(value);
    }

    return (
        <Wrapper>
        {error && <div className="error">Tnere was an error!</div> }
            <label>Username</label>
            <input type="text" value={username} name="username" onChange={handleInput} />
            <input type="password" value={password} name="password" onChange={handleInput} />
            <Button text="Login" callback={handleSubmit} />
        </Wrapper>
    )
}

export default Login;