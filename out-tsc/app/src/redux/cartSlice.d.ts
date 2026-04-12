import type { Product, CartState } from '../types/types';
export declare const addToCart: import("@reduxjs/toolkit").ActionCreatorWithPayload<Product, "cart/addToCart">, updateQuantity: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    id: string;
    count: number;
}, "cart/updateQuantity">, removeFromCart: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "cart/removeFromCart">, clearCart: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"cart/clearCart">;
declare const _default: import("redux").Reducer<CartState>;
export default _default;
