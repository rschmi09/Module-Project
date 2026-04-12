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
// src/components/CategoryNav.tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// Fetch Categories
const fetchCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get('https://fakestoreapi.com/products/categories');
    return response.data;
});
const CategoryNav = ({ selectedCategory, setSelectedCategory }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });
    if (isLoading)
        return _jsx("p", { children: "Loading categories..." });
    return (_jsxs("select", { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), children: [_jsx("option", { value: '', children: "All Categories" }), data === null || data === void 0 ? void 0 : data.map(category => (_jsx("option", { value: category, children: category }, category)))] }));
};
export default CategoryNav;
