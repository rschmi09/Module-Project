// jest.setup.ts

import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

(globalThis as unknown as {
  TextEncoder: typeof TextEncoder;
  TextDecoder: typeof TextDecoder;
}).TextEncoder = TextEncoder;

(globalThis as unknown as {
  TextEncoder: typeof TextEncoder;
  TextDecoder: typeof TextDecoder;
}).TextDecoder = TextDecoder;