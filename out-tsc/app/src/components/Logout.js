// src/components/Logout.tsx
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
export const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield signOut(auth);
        alert('Logged out');
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Logout error:', err.message);
        }
        else {
            console.error('Unexpected logout error');
        }
    }
});
