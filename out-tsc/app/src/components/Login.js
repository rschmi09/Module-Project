var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/Login.tsx
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
    const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield signInWithEmailAndPassword(auth, email.trim(), password.trim());
            navigate('/');
        }
        catch (err) {
            if (err instanceof FirebaseError) {
                setError(err.message);
            }
            else {
                setError('An unexpected error occured.');
            }
        }
    });
    return (_jsx(_Fragment, { children: _jsxs("form", { onSubmit: handleLogin, children: [_jsx("h2", { children: "Login" }), _jsx("input", { type: 'email', placeholder: 'Email', value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("input", { type: 'password', placeholder: 'Password', value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("button", { type: 'submit', children: "Login" }), error && _jsx("p", { children: error })] }) }));
};
export default Login;
