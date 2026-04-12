// src/redux.selectors.ts
export const selectCart = (state) => state.cart;
export const selectTotalCount = (state) => state.cart.reduce((sum, item) => { var _a; return sum + ((_a = item.count) !== null && _a !== void 0 ? _a : 0); }, 0);
export const selectTotalPrice = (state) => state.cart.reduce((sum, item) => { var _a; return sum + (item.price * ((_a = item.count) !== null && _a !== void 0 ? _a : 0)); }, 0);
