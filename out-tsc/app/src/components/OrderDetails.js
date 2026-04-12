import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const OrderDetails = ({ order }) => {
    return (_jsxs("div", { children: [_jsx("h3", { children: "OrderDetails" }), order.products.map((p) => {
                var _a;
                return (_jsxs("div", { children: [_jsx("p", { children: p.title }), _jsxs("p", { children: ["Qty: ", (_a = p.count) !== null && _a !== void 0 ? _a : 0] }), _jsxs("p", { children: ["$", p.price] })] }, p.id));
            }), _jsxs("p", { children: [_jsx("strong", { children: "Total:" }), "$", order.totalPrice] })] }));
};
export default OrderDetails;
