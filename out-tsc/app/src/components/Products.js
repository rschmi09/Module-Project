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
// src/components/Products.tsx
// Fetch data using 'useQuery'
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
// source for fallback placeholder image 
const placeholderImage = 'https://via.placeholder.com/150';
// Fetch function
const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const querySnapshot = yield getDocs(collection(db, 'products'));
    const products = querySnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    return products;
});
const Products = ({ selectedCategory }) => {
    const dispatch = useDispatch();
    // useQuery
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    });
    // Error Handling
    if (isLoading)
        return _jsx("p", { children: "Loading..." });
    if (error instanceof Error) {
        return _jsxs("p", { children: ["Error: ", error.message] });
    }
    if (!data)
        return null;
    const filteredProducts = selectedCategory
        ? data.filter(p => p.category === selectedCategory)
        : data;
    return (_jsx("div", { className: 'products-container', children: filteredProducts.map(product => (_jsxs("div", { className: 'product-card', children: [_jsx("h2", { children: product.title }), _jsx("img", { src: product.image, alt: product.title, width: '150', onError: (e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = placeholderImage;
                    } }), _jsxs("p", { children: [_jsx("strong", { children: "Price:" }), " $", product.price] }), _jsxs("p", { children: [_jsx("strong", { children: "Category:" }), " ", product.category] }), _jsxs("p", { children: [_jsx("strong", { children: "Description:" }), " ", product.description] }), _jsxs("p", { children: [_jsx("strong", { children: "Rating:" }), " ", product.rating.rate] }), _jsx("button", { onClick: () => dispatch(addToCart(product)), children: "Add Item to Cart" })] }, product.id))) }));
};
export default Products;
