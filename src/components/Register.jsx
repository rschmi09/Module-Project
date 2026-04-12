// src/components/Register.jsx

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { serverTimestamp } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
            const user = userCredential.user;

            // firestore 'user' document
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: serverTimestamp()    // uses firestore timestamp, not user's
            });

            alert('Registration successful!');
            navigate('/');      // redirect to home

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occured.');
            }
        }
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Register</h2>

            <form onSubmit={handleRegister}>
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

                <button type='submit'>Register</button>
                {error && <p>{error}</p>}

            </form>

            <p>
                Already have an account? <Link to='/login'>Login</Link>
            </p>

        </div>
    );

};

export default Register;