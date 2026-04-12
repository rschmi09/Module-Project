var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/ShoppingCart.tsx
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '../redux/cartSlice';
import { selectCart, selectTotalCount, selectTotalPrice } from '../redux/selectors';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import OrderHistory from './OrderHistory';
import { auth } from '../firebaseConfig';
const ShoppingCart = () => {
    const dispatch = useDispatch();
    // Selectors (for totals)
    const cart = useSelector(selectCart);
    const totalCount = useSelector(selectTotalCount);
    const totalPrice = useSelector(selectTotalPrice);
    // Handle Checkout
    const handleCheckout = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const order = {
            userId: (_a = auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid,
            createdAt: serverTimestamp(),
            product: cart,
            totalPrice
        };
        yield addDoc(collection(db, 'orders'), order);
        dispatch(clearCart());
        alert('order placed successfuly! Your cart has been cleared.');
    });
    return (_jsxs("div", { className: 'shopping-cart-container', children: [_jsx("h2", { children: "Shopping Cart" }), !cart.length && _jsx("p", { children: "Your cart is empty" }), cart.map((item) => {
                var _a;
                return (_jsxs("div", { className: 'cart-item-card', children: [_jsx("h3", { children: item.title }), _jsx("img", { src: item.image, alt: item.title, width: '100' }), _jsxs("p", { children: ["Price: $", item.price.toFixed(2)] }), _jsxs("p", { children: ["Quantity: ", (_a = item.count) !== null && _a !== void 0 ? _a : 0] }), _jsxs("div", { className: 'quantity-controls', children: [_jsx("button", { onClick: () => {
                                        var _a;
                                        return dispatch(updateQuantity({
                                            id: item.id,
                                            count: ((_a = item.count) !== null && _a !== void 0 ? _a : 0) - 1
                                        }));
                                    }, children: "-" }), _jsx("span", { children: item.count }), _jsx("button", { onClick: () => {
                                        var _a;
                                        return dispatch(updateQuantity({
                                            id: item.id,
                                            count: ((_a = item.count) !== null && _a !== void 0 ? _a : 0) + 1
                                        }));
                                    }, children: "+" })] }), _jsx("button", { onClick: () => dispatch(removeFromCart(item.id)), children: "Remove" })] }, item.id));
            }), _jsx("hr", {}), _jsxs("p", { children: [_jsx("strong", { children: "Total Items:" }), " ", totalCount] }), _jsxs("p", { children: [_jsx("strong", { children: "Total Price:" }), " $", totalPrice.toFixed(2)] }), _jsx("button", { onClick: handleCheckout, children: "Checkout" }), _jsx("hr", {}), _jsx(OrderHistory, {})] }));
};
export default ShoppingCart;
