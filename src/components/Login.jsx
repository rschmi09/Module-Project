// src/components/Login.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebaseConfig';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email.trim(), password.trim());
            navigate('/');

        }   catch (err) {
            if (err instanceof FirebaseError) {
                setError(err.message);
            } else {
                setError('An unexpected error occured.');
            }
        }   
    };

    return (
        <>
            <form onSubmit={handleLogin}>

                <h2>Login</h2>

                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />    

                <button type='submit'>Login</button>  
                {error && <p>{error}</p>}        
            </form>

            
        
        </>
    );

};

export default Login;
