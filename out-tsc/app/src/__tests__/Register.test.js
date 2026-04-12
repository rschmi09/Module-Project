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
// src/__tests__/Register.test.tsx
// import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../components/Register';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { BrowserRouter } from 'react-router-dom';
// --- Mock Firebase auth and firestore ---
jest.mock('../firebaseConfig', () => ({
    auth: {},
    db: {},
}));
jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
    setDoc: jest.fn(),
    doc: jest.fn(),
    serverTimestamp: jest.fn(() => 'mocked-timestamp'),
}));
// --- Mock useNavigate from react-router-dom ---
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return Object.assign(Object.assign({}, actual), { useNavigate: () => mockedNavigate });
});
// --- Mock window.alert ---
window.alert = jest.fn();
describe('Register Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        window.alert = jest.fn(); // mock alert
    });
    test('renders Register form and updates input values', () => {
        render(_jsx(BrowserRouter, { children: _jsx(Register, {}) }));
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const registerButton = screen.getByRole('button', { name: /register/i });
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });
    test('successful registration calls Firebase and navigates', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCreateUser = createUserWithEmailAndPassword;
        const mockSetDoc = setDoc;
        const mockDoc = doc;
        // --- Scenario 1: Successful registration ---
        //----Mock user
        const mockUser = {
            uid: 'abc123',
            email: 'success@example.com',
        };
        const mockUserCredential = {
            user: mockUser,
            providerId: 'password',
            operationType: 'signIn',
        };
        mockCreateUser.mockResolvedValueOnce(mockUserCredential);
        mockDoc.mockReturnValue('mocked-doc'); // doc() returns a reference
        mockSetDoc.mockResolvedValueOnce(undefined);
        render(_jsx(BrowserRouter, { children: _jsx(Register, {}) }));
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const registerButton = screen.getByRole('button', { name: /register/i });
        fireEvent.change(emailInput, { target: { value: 'success@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(registerButton);
        yield waitFor(() => {
            expect(mockCreateUser).toHaveBeenCalledWith(expect.anything(), 'success@example.com', 'password123');
            expect(mockDoc).toHaveBeenCalledWith(expect.anything(), 'users', 'abc123');
            expect(mockSetDoc).toHaveBeenCalledWith('mocked-doc', {
                email: 'success@example.com',
                createdAt: 'mocked-timestamp',
            });
            expect(window.alert).toHaveBeenCalledWith('Registration successful!');
            expect(mockedNavigate).toHaveBeenCalledWith('/');
        });
    }));
    // --- Scenario 2: Failed registration ---
    test('failed registration shows error message', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCreateUser = createUserWithEmailAndPassword;
        mockCreateUser.mockRejectedValueOnce(new Error('Email already in use'));
        render(_jsx(BrowserRouter, { children: _jsx(Register, {}) }));
        const emailInput2 = screen.getByPlaceholderText('Email');
        const passwordInput2 = screen.getByPlaceholderText('Password');
        const registerButton2 = screen.getByRole('button', { name: /register/i });
        fireEvent.change(emailInput2, { target: { value: 'fail@example.com' } });
        fireEvent.change(passwordInput2, { target: { value: 'wrongpass' } });
        fireEvent.click(registerButton2);
        const errorMessage = yield screen.findByText('Email already in use');
        expect(errorMessage).toBeInTheDocument();
    }));
});
