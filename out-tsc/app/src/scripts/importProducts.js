// src/scripts/importProducts.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.ts';
function importProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://fakestoreapi.com/products');
            const products = yield response.json();
            for (const p of products) {
                yield addDoc(collection(db, 'products'), {
                    title: p.title,
                    price: p.price,
                    description: p.description,
                    category: p.category,
                    image: p.image,
                    rating: p.rating
                });
            }
            console.log('Products imported successfully');
        }
        catch (err) {
            console.error('Error importing products:', err);
        }
    });
}
importProducts();
