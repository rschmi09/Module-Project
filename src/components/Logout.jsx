// src/components/Logout.jsx

import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export const handleLogout = async () => {
    try {
        await signOut(auth);
        alert('Logged out')
    }   catch (err) {
        if (err instanceof Error) {
            console.error('Logout error:', err.message);
        } else {
            console.error('Unexpected logout error');
        }
    }
};
