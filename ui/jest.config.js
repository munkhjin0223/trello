module.exports = {
  roots: ['<rootDir>/__tests__'],
  collectCoverage: true,
  testEnvironment: 'jsdom',
  coverageDirectory: '__tests__/coverage/',
  testRegex: '__tests__/.*\\.(ts|tsx)$',
  setupFilesAfterEnv: ['./src/setupTests.ts']
};
