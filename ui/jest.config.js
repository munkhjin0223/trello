module.exports = {
  roots: ['<rootDir>/__tests__'],
  collectCoverage: true,
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.tsx'],
  coverageDirectory: '__tests__/coverage/',
  testRegex: '__tests__/.*\\.(ts|tsx)$',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  coverageThreshold: {
    global: {
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
