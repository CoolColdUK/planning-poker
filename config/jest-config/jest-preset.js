module.exports = {
  preset: 'ts-jest',
  // rootDir: './src',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  passWithNoTests: true,
  maxConcurrency: 1,
  maxWorkers: 1,
  resetMocks: false,
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: ['<rootDir>/endpoints'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  // testRegex: '.test.ts$',
};
