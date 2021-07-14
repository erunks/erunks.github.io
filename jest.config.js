module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      lines: 80,
      functions: 80,
    },
  },
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx}',
    '!**/src/lib/index.js',
    '!**/src/lib/constants.js',
    '!**/src/lib/contentful/collections/**',
    '!**/src/prop_types/**',
    '!**/src/recoils/**',
  ],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.module\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
};
