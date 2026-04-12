// src/__tests__/CartUpdate.test.tsx

jest.mock('../firebaseConfig', () => ({                                 // simulate authorized user            
    __esModule: true,
    db: {},
    auth: {
        currentUser: { uid: 'test-user' }
    }
}));

// Mock Firestore functions                 
jest.mock('firebase/firestore', () => ({
    getDocs: jest.fn(),
    collection: jest.fn(),
    addDoc: jest.fn(),
    serverTimestamp: jest.fn(),
    
    query: jest.fn(),
    where: jest.fn(),
    onSnapshot: jest.fn(() => jest.fn()),                               // returns unsubs
}));

// Mock unrelated OrderHistory component
jest.mock('../components/OrderHistory', () => () => <div />);

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import cartReducer from '../redux/cartSlice';
import ShoppingCart from '../components/ShoppingCart';
import Products from '../components/Products';


// --- Mock React Query ---

jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useQuery: () => ({
        data: [
            { 
                id: '1', 
                title: 'Test Product', 
                price: 10, 
                category: 'Test Category',
                description: 'Test Description',
                image: 'test-image.jpg',
                rating: { rate: 4 } 
            }
        ],
        isLoading: false,
        error: null,
    }),
}));


describe('ShoppingCart Integration Test', () => {
    it('adds product to cart and updates UI', async () => {
        const store = configureStore({
            reducer: {
                cart: cartReducer,
            },
        });

        const queryClient = new QueryClient();

        // Render Products and ShoppingCart together
        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Products selectedCategory="" />
                    <ShoppingCart />
                </QueryClientProvider>
            </Provider>
        );

        // Simulate user clicking "Add to Cart" button for the test product
        const addButton = screen.getByRole('button', { name: /add item to cart/i });

        // Click button
        await userEvent.click(addButton);


        // --- Assert cart updates ---
        
        // Cart Item Quantity update
        const cartQuantity = screen.getByText(/quantity:/i).parentElement;
        expect(cartQuantity).toHaveTextContent('1');

        // Total Items update
        const totalItems = screen.getByText(/total items:/i).parentElement;
        expect(totalItems).toHaveTextContent('1');

        // Total Price update
        const totalPrice = screen.getByText(/total price:/i).parentElement;
        expect(totalPrice).toHaveTextContent('10');
    });

});