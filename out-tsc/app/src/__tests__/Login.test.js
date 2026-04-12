var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
// src/components/__tests__/Login.test.tsx
// import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
// --- Mock Firebase auth ---
jest.mock('../firebaseConfig', () => ({
    auth: {},
    db: {},
}));
jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
}));
// --- Mock useNavigate from react-router-dom ---
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return Object.assign(Object.assign({}, actual), { useNavigate: () => mockedNavigate });
});
describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });
    // --- Test 1: Rendering and input state updates ---
    test('renders Login form and updates input values', () => {
        render(_jsx(BrowserRouter, { children: _jsx(Login, {}) }));
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: /login/i });
        // Check that form elements are rendered
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
        // Simulate typing in inputs
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        // Ensure input values updated correctly
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });
    // --- Test 2: Successful login ---
    test('successful login navigates to home', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSignIn = signInWithEmailAndPassword;
        mockSignIn.mockResolvedValueOnce({ user: { uid: '123' } });
        render(_jsx(BrowserRouter, { children: _jsx(Login, {}) }));
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: /login/i });
        // Simulate typing in inputs
        fireEvent.change(emailInput, { target: { value: 'success@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);
        yield waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith(expect.anything(), 'success@example.com', 'password123');
            expect(mockedNavigate).toHaveBeenCalledWith('/');
        });
    }));
    // --- Test 3: Failed login and shows error message ---
    test('failed login shows error', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSignIn = signInWithEmailAndPassword;
        mockSignIn.mockRejectedValueOnce(new FirebaseError('auth/invalid-credentials', 'Invalid credentials'));
        render(_jsx(BrowserRouter, { children: _jsx(Login, {}) }));
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: /login/i });
        // Simulate typing in inputs
        fireEvent.change(emailInput, { target: { value: 'fail@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
        fireEvent.click(loginButton);
        // Check that error message is displayed
        const errorMessage = yield screen.findByText('Invalid credentials');
        expect(errorMessage).toBeInTheDocument();
    }));
});
