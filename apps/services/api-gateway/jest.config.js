/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@dailyshop/shared-types$': '<rootDir>/../../../../libs/shared-types/src/index.ts',
    '^@dailyshop/shared-utils$': '<rootDir>/../../../../libs/shared-utils/src/index.ts'
  },
  moduleDirectories: ['node_modules', '<rootDir>/../../../node_modules'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: ['node_modules/(?!(@dailyshop)/)']
}
