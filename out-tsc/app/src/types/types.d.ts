import { Timestamp } from "firebase/firestore";
export type Product = {
    id: string;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    count?: number;
};
export type CartState = Product[];
export type CartItem = Product & {
    count: number;
};
export type Order = {
    id: string;
    userId: string;
    products: Product[];
    totalPrice: number;
    createdAt: Timestamp;
};
