import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ShoppingCart from './components/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { selectTotalCount } from './redux/selectors';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { setUser, clearUser } from './redux/authSlice';
import Login from './components/Login';
import Register from './components/Register';
import { handleLogout } from './components/Logout';
import ProductManagement from './components/ProductManagement';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
    const dispatch = useDispatch();
    // get total item count from Redux
    const totalCount = useSelector(selectTotalCount);
    // Access current user anywhere
    const currentUser = useSelector((state) => state.auth.currentUser);
    const location = useLocation();
    // Show NavBar only on non-login/register pages
    const showNav = location.pathname !== '/login' && location.pathname !== '/register';
    // Listen to Firebase Auth changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser(user)); //store logged-in user in Redux
            }
            else {
                dispatch(clearUser()); // clear user on logout
            }
        });
        return () => unsubscribe();
    }, [dispatch]);
    return (_jsxs("div", { className: 'app-container', children: [showNav && (_jsxs("nav", { className: 'navbar', children: [_jsxs("div", { className: 'navbar-left', children: [_jsx(Link, { to: '/', children: "Home" }), _jsx(Link, { to: '/product-management', children: "Product Management" })] }), _jsxs("div", { className: 'navbar-right', children: [_jsxs(Link, { to: '/cart', children: ["Cart (", totalCount, ")"] }), currentUser && _jsx("button", { onClick: handleLogout, children: "Logout" })] })] })), _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(ProtectedRoute, { children: _jsx(Home, {}) }) }), _jsx(Route, { path: '/login', element: _jsx(Login, {}) }), _jsx(Route, { path: '/register', element: !currentUser ? _jsx(Register, {}) : _jsx(Navigate, { to: '/' }) }), _jsx(Route, { path: '/cart', element: _jsx(ProtectedRoute, { children: _jsx(ShoppingCart, {}) }) }), _jsx(Route, { path: 'product-management', element: _jsx(ProtectedRoute, { children: _jsx(ProductManagement, {}) }) }), _jsx(Route, { path: '*', element: _jsx(Navigate, { to: '/', replace: true }) })] })] }));
};
export default App;
