import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Home.tsx
import { useState } from 'react';
import CategoryNav from '../components/CategoryNav';
import Products from '../components/Products';
const Home = () => {
    // Track the currently selected category
    const [selectedCategory, setSelectedCategory] = useState('');
    return (_jsxs("div", { children: [_jsxs("div", { className: 'home-header', children: [_jsx("h1", { children: "Fake Store Products" }), _jsx(CategoryNav, { selectedCategory: selectedCategory, setSelectedCategory: setSelectedCategory })] }), _jsx(Products, { selectedCategory: selectedCategory })] }));
};
export default Home;
