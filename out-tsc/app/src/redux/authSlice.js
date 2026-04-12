// src/redux/authSlice.ts
// allow components accross the app to access currently
// loged-in user
import { createSlice } from '@reduxjs/toolkit';
// Initialize state
const initialState = {
    currentUser: null,
};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        clearUser: (state) => {
            state.currentUser = null;
        },
    },
});
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
