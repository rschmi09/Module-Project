// jest.config.cjs

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },

  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/out-tsc/'
  ],
};