import type { RootState } from '../redux/store';
export declare const selectCart: (state: RootState) => import("../types/types").CartState;
export declare const selectTotalCount: (state: RootState) => number;
export declare const selectTotalPrice: (state: RootState) => number;
