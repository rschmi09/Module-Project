// src/components/UserManagement.jsx

// CRUD operations w/ Firestrore: Display, Update, and Delete
// Create is included in Register.jsx

import { useState, useEffect } from "react";
import { db } from '../firebaseConfig';
import { collection, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';


const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newAddress, setNewAddress] = useState('');

    // updateUser Function
    const updateUser = async (
        userId,
        updatedData
    )  => {
        if (!userId) return;

        const userDoc = doc(db, 'users', userId);
        await updateDoc(userDoc, updatedData);

    };

    // deleteUser Function
    const deleteUser = async (
        userId,
    ) => {
        if (!userId) return;

        const userDoc = doc(db, 'users', userId);
        await deleteDoc(userDoc);

    };

    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
        
            const dataArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
        
            setUsers(dataArray);
        });

    // cleanup listener when component unmounts
        return () => unsubscribe();

        
   }, []);

    return (
        <div>

            <h2>Users</h2>
            {users.map((user) => (
                <div
                    style={{
                        border: '2px solid black',
                        margin: '10px'
                    }}
                >
                    <div key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Age: {user.age}</p>
                        <p>Address: {user.address}</p>
                    </div>

                    {/* Update User Data */}
                    <input
                        onChange={(e) => setNewName(e.target.value)}
                        type='text'
                        placeholder='Enter new name:'
                    />
                    <button onClick={() => updateUser(user.id, { name: newName})}>
                        Update Name
                    </button>
                
                    <input
                        onChange={(e) => setNewAge(e.target.value)}
                        type='number'
                        placeholder='Enter new age:'
                    />
                    <button onClick={() => updateUser(user.id, { age: Number(newAge)})}>
                        Update Age
                    </button>

                    <input
                        onChange={(e) => setNewAddress(e.target.value)}
                        type='text'
                        placeholder='Enter new address:'
                    />
                    <button onClick={() => updateUser(user.id, { address: newAddress})}>
                        Update Address
                    </button>

                    {/* Delete User Data */}
                    <button
                        style={{ backgroundColor: 'crimson'}}
                        onClick={() => deleteUser(user.id)}>
                            Delete User
                    </button>
                      
                </div>

            ))}

        </div>

    );

};

export default UserManagement;