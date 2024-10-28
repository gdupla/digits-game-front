import React, {useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {authApi} from "../api/AuthApi";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const success = await authApi.login(username, password);

        // @ts-ignore
        if (success) {
            // Redirect to the waiting room if login is successful
            navigate('/waiting-room');
        } else {
            // Redirect to the root page if login fails
            navigate('/');
        }
    };

    const handleGoogleLogin = async () => {
        await authApi.loginWithGoogle();
        navigate('/waiting-room');
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <button onClick={() => navigate('/create-user')}>Create User</button>
        </div>
    );
};

export default Login;
