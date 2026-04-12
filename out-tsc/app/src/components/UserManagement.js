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
// src/components/UserManagement.tsx
// CRUD operations w/ Firestrore: Display, Update, and Delete
// Create is included in Register.tsx
import { useState, useEffect } from "react";
import { db } from '../firebaseConfig';
import { collection, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newAddress, setNewAddress] = useState('');
    // updateUser Function
    const updateUser = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userId)
            return;
        const userDoc = doc(db, 'users', userId);
        yield updateDoc(userDoc, updatedData);
        //fetchData(); - removed to utilize firestore realtime listener
    });
    // deleteUser Function
    const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userId)
            return;
        const userDoc = doc(db, 'users', userId);
        yield deleteDoc(userDoc);
        //fetchData(); - removed to utilize firestore realtime listener
    });
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const dataArray = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            setUsers(dataArray);
        });
        // cleanup listener when component unmounts
        return () => unsubscribe();
        // allow all functions to reuse 'fetchData()' - removed to utilize firestore realtime listener
        //useEffect(() => {
        //fetchData();
    }, []);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Users" }), users.map((user) => (_jsxs("div", { style: {
                    border: '2px solid black',
                    margin: '10px'
                }, children: [_jsxs("div", { children: [_jsxs("p", { children: ["Name: ", user.name] }), _jsxs("p", { children: ["Age: ", user.age] }), _jsxs("p", { children: ["Address: ", user.address] })] }, user.id), _jsx("input", { onChange: (e) => setNewName(e.target.value), type: 'text', placeholder: 'Enter new name:' }), _jsx("button", { onClick: () => updateUser(user.id, { name: newName }), children: "Update Name" }), _jsx("input", { onChange: (e) => setNewAge(e.target.value), type: 'number', placeholder: 'Enter new age:' }), _jsx("button", { onClick: () => updateUser(user.id, { age: Number(newAge) }), children: "Update Age" }), _jsx("input", { onChange: (e) => setNewAddress(e.target.value), type: 'text', placeholder: 'Enter new address:' }), _jsx("button", { onClick: () => updateUser(user.id, { address: newAddress }), children: "Update Address" }), _jsx("button", { style: { backgroundColor: 'crimson' }, onClick: () => deleteUser(user.id), children: "Delete User" })] })))] }));
};
export default UserManagement;
