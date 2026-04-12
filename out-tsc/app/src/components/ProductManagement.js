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
// src/components/ProductManagement.tsx
// CRUD operations w/ Firestrore: Add, Display, Update, and Delete
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
const placeholderImage = "https://via.placeholder.com/150";
const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    // Inputs for new products
    const [newTitle, setNewTitle] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [newCategory, setNewCategory] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newRating, setNewRating] = useState(0);
    // Update inputs per product
    const [editValues, setEditValues] = useState({});
    // Firestore CRUD functions
    const createProduct = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!newTitle || !newCategory)
            return;
        yield addDoc(collection(db, 'products'), {
            title: newTitle,
            price: newPrice,
            category: newCategory,
            description: newDescription,
            image: newImage || placeholderImage,
            rating: {
                rate: newRating,
                count: 0
            }
        });
        // Clear inputs
        setNewTitle('');
        setNewPrice(0);
        setNewCategory('');
        setNewDescription('');
        setNewImage('');
        setNewRating(0);
    });
    const updateProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedData = editValues[productId];
        if (!updatedData)
            return;
        const productDoc = doc(db, 'products', productId);
        yield updateDoc(productDoc, updatedData);
        // Clear edit values 
        setEditValues(prev => (Object.assign(Object.assign({}, prev), { [productId]: {} })));
    });
    const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
        const productDoc = doc(db, 'products', productId);
        yield deleteDoc(productDoc);
    });
    // Real-time listener
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
            const data = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
            setProducts(data);
        });
        return () => unsubscribe();
    }, []);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Products" }), _jsxs("div", { style: { border: "2px solid blue", padding: "10px", marginBottom: "20px" }, children: [_jsx("h3", { children: "Create New Product" }), _jsx("input", { type: 'text', placeholder: 'Title', value: newTitle, onChange: (e) => setNewTitle(e.target.value) }), _jsx("input", { type: 'number', placeholder: 'Price', value: newPrice, onChange: (e) => setNewPrice(Number(e.target.value)) }), _jsx("input", { type: 'text', placeholder: 'Category', value: newCategory, onChange: (e) => setNewCategory(e.target.value) }), _jsx("input", { type: 'text', placeholder: 'Description', value: newDescription, onChange: (e) => setNewDescription(e.target.value) }), _jsx("input", { type: 'text', placeholder: 'Image URL', value: newImage, onChange: (e) => setNewImage(e.target.value) }), _jsx("input", { type: 'number', placeholder: 'Rating', value: newRating, onChange: (e) => setNewRating(Number(e.target.value)) }), _jsx("button", { onClick: createProduct, children: "Add Product" })] }), products.map((product) => {
                var _a, _b, _c, _d, _e, _f, _g;
                return (_jsxs("div", { style: {
                        border: '2px solid black',
                        margin: '10px',
                        padding: '10px'
                    }, children: [_jsx("h3", { children: product.title }), _jsx("img", { src: product.image || placeholderImage, width: 150, alt: product.title, onError: (e) => {
                                e.currentTarget.src = placeholderImage;
                            } }), _jsxs("p", { children: [_jsx("strong", { children: "Price:" }), " $", product.price] }), _jsxs("p", { children: [_jsx("strong", { children: "Category:" }), " ", product.category] }), _jsxs("p", { children: [_jsx("strong", { children: "Description:" }), " ", product.description] }), _jsxs("p", { children: [_jsx("strong", { children: "Rating:" }), " ", product.rating.rate] }), _jsxs("div", { style: { marginTop: '10px' }, children: [_jsx("input", { placeholder: 'Title', value: ((_a = editValues[product.id]) === null || _a === void 0 ? void 0 : _a.title) || '', onChange: (e) => setEditValues(prev => (Object.assign(Object.assign({}, prev), { [product.id]: Object.assign(Object.assign({}, prev[product.id]), { title: e.target.value }) }))) }), _jsx("input", { type: 'number', placeholder: 'Price', value: ((_b = editValues[product.id]) === null || _b === void 0 ? void 0 : _b.price) || '', onChange: (e) => setEditValues(prev => (Object.assign(Object.assign({}, prev), { [product.id]: Object.assign(Object.assign({}, prev[product.id]), { price: Number(e.target.value) }) }))) }), _jsx("input", { placeholder: 'Category', value: ((_c = editValues[product.id]) === null || _c === void 0 ? void 0 : _c.category) || '', onChange: (e) => setEditValues(prev => (Object.assign(Object.assign({}, prev), { [product.id]: Object.assign(Object.assign({}, prev[product.id]), { category: e.target.value }) }))) }), _jsx("input", { placeholder: 'Description', value: ((_d = editValues[product.id]) === null || _d === void 0 ? void 0 : _d.description) || '', onChange: (e) => setEditValues(prev => (Object.assign(Object.assign({}, prev), { [product.id]: Object.assign(Object.assign({}, prev[product.id]), { description: e.target.value }) }))) }), _jsx("input", { placeholder: 'Image', value: ((_e = editValues[product.id]) === null || _e === void 0 ? void 0 : _e.image) || '', onChange: (e) => setEditValues(prev => (Object.assign(Object.assign({}, prev), { [product.id]: Object.assign(Object.assign({}, prev[product.id]), { image: e.target.value }) }))) }), _jsx("input", { type: 'number', placeholder: 'Rating', value: ((_g = (_f = editValues[product.id]) === null || _f === void 0 ? void 0 : _f.rating) === null || _g === void 0 ? void 0 : _g.rate) || '', onChange: (e) => setEditValues(prev => (Object.assign(Object.assign({}, prev), { [product.id]: Object.assign(Object.assign({}, prev[product.id]), { rating: {
                                                rate: Number(e.target.value),
                                                count: product.rating.count
                                            } }) }))) }), _jsx("button", { onClick: () => updateProduct(product.id), children: "Update Product" }), _jsx("button", { onClick: () => deleteProduct(product.id), children: "Delete Product" })] })] }, product.id));
            })] }));
};
export default ProductManagement;
