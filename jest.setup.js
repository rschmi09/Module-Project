// jest.setup.js

import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// jest.setup.js
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder