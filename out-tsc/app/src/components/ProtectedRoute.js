import { jsx as _jsx } from "react/jsx-runtime";
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children }) => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    if (!currentUser) {
        return _jsx(Navigate, { to: '/register', replace: true });
    }
    return children;
};
export default ProtectedRoute;
