import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
interface AuthState {
    currentUser: User | null;
}
export declare const authSlice: import("@reduxjs/toolkit").Slice<AuthState, {
    setUser: (state: {
        currentUser: {
            emailVerified: boolean;
            isAnonymous: boolean;
            metadata: {
                creationTime?: string | undefined;
                lastSignInTime?: string | undefined;
            };
            providerData: {
                displayName: string | null;
                email: string | null;
                phoneNumber: string | null;
                photoURL: string | null;
                providerId: string;
                uid: string;
            }[];
            refreshToken: string;
            tenantId: string | null;
            delete: () => Promise<void>;
            getIdToken: (forceRefresh?: boolean) => Promise<string>;
            getIdTokenResult: (forceRefresh?: boolean) => Promise<import("@firebase/auth").IdTokenResult>;
            reload: () => Promise<void>;
            toJSON: () => object;
            displayName: string | null;
            email: string | null;
            phoneNumber: string | null;
            photoURL: string | null;
            providerId: string;
            uid: string;
        } | null;
    }, action: PayloadAction<User | null>) => void;
    clearUser: (state: {
        currentUser: {
            emailVerified: boolean;
            isAnonymous: boolean;
            metadata: {
                creationTime?: string | undefined;
                lastSignInTime?: string | undefined;
            };
            providerData: {
                displayName: string | null;
                email: string | null;
                phoneNumber: string | null;
                photoURL: string | null;
                providerId: string;
                uid: string;
            }[];
            refreshToken: string;
            tenantId: string | null;
            delete: () => Promise<void>;
            getIdToken: (forceRefresh?: boolean) => Promise<string>;
            getIdTokenResult: (forceRefresh?: boolean) => Promise<import("@firebase/auth").IdTokenResult>;
            reload: () => Promise<void>;
            toJSON: () => object;
            displayName: string | null;
            email: string | null;
            phoneNumber: string | null;
            photoURL: string | null;
            providerId: string;
            uid: string;
        } | null;
    }) => void;
}, "auth", "auth", import("@reduxjs/toolkit").SliceSelectors<AuthState>>;
export declare const setUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<User | null, "auth/setUser">, clearUser: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearUser">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
