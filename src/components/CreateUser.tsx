import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authApi} from "../api/AuthApi";

const CreateUser: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async () => {
        await authApi.createUser(username, email, password);
        navigate('/');
    };

    return (
        <div>
            <h2>Create User</h2>
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleCreateUser}>Create</button>
        </div>
    );
};

export default CreateUser;
