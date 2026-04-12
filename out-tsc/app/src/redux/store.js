// src/redux/store.ts
// Configure store
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import AuthReducer from './authSlice';
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: AuthReducer,
    },
});
