// src/redux.selectors.js

// exportable totalCount and totalPrice for the cart



export const selectCart = (state) => state.cart

export const selectTotalCount = (state) =>
  state.cart.reduce((sum, item) => sum + (item.count ?? 0), 0)

export const selectTotalPrice = (state) =>
  state.cart.reduce((sum, item) => sum + (item.price * (item.count ?? 0)), 0)
