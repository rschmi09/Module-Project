var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Register.tsx
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
    const handleRegister = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const userCredential = yield createUserWithEmailAndPassword(auth, email.trim(), password.trim());
            const user = userCredential.user;
            // firestore 'user' document
            yield setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: serverTimestamp() // uses firestore timestamp, not user's
            });
            alert('Registration successful!');
            navigate('/'); // redirect to home
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('An unexpected error occured.');
            }
        }
    });
    return (_jsxs("div", { style: { padding: '2rem' }, children: [_jsx("h2", { children: "Register" }), _jsxs("form", { onSubmit: handleRegister, children: [_jsx("input", { type: 'email', placeholder: 'Email', value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("input", { type: 'password', placeholder: 'Password', value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("button", { type: 'submit', children: "Register" }), error && _jsx("p", { children: error })] }), _jsxs("p", { children: ["Already have an account? ", _jsx(Link, { to: '/login', children: "Login" })] })] }));
};
export default Register;
