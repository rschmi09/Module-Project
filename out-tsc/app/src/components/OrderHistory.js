import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components.OrderHistory.tsx
// show all orders for a user
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig';
const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        var _a;
        const q = query(collection(db, 'orders'), where('userId', '==', (_a = auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
            setOrders(data);
        });
        return () => unsubscribe();
    }, []);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Order History" }), orders.map(order => {
                var _a;
                return (_jsxs("div", { style: {
                        border: '1px solid gray',
                        padding: '1rem',
                        margin: '1rem'
                    }, children: [_jsxs("p", { children: [_jsx("strong", { children: "Order ID:" }), order.id] }), _jsxs("p", { children: [_jsx("strong", { children: "Total:" }), "$", order.totalPrice.toFixed(2)] }), _jsxs("p", { children: [_jsx("strong", { children: "Date:" }), (_a = order.createdAt) === null || _a === void 0 ? void 0 : _a.toDate().toLocaleString()] })] }, order.id));
            })] }));
};
export default OrderHistory;
