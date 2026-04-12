// src/redux/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
// Initialize from sessionStorage
const cartFromStorage = sessionStorage.getItem('cart');
const initialState = cartFromStorage ? JSON.parse(cartFromStorage) : [];
const saveToSession = (cart) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            var _a;
            const existing = state.find(item => item.id === action.payload.id);
            if (existing) {
                existing.count = ((_a = existing.count) !== null && _a !== void 0 ? _a : 0) + 1;
            }
            else {
                state.push(Object.assign(Object.assign({}, action.payload), { count: 1 }));
            }
            saveToSession(state);
        },
        updateQuantity: (state, action) => {
            const { id, count } = action.payload;
            const item = state.find(i => i.id === id);
            if (!item)
                return; // exit if item not found
            if (count <= 0) {
                // remove item if count is 0 or less
                const index = state.findIndex(i => i.id === id);
                if (index >= 0)
                    state.splice(index, 1);
            }
            else {
                // update count
                item.count = count;
            }
            saveToSession(state);
        },
        removeFromCart: (state, action) => {
            const index = state.findIndex(item => item.id == action.payload);
            if (index >= 0) {
                state.splice(index, 1);
            }
            saveToSession(state);
        },
        clearCart: (state) => {
            state.length = 0;
            saveToSession(state);
        }
    }
});
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
