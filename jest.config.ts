// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Indicates the root directory of your project
  roots: ['<rootDir>'],

  // A list of file extensions to include when searching for test files
  testMatch: ['**/tests/**/*.+(ts|tsx|js|jsx)'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Transform files with ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Optionally, you can configure other Jest options here
  // For example:
  // setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],

  // Optionally, you can define globals, mocks, or setup functions
  // globals: {
  //   // Your global variables here
  // },

  // Optionally, you can configure test coverage settings
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },

  // Optionally, you can set up reporters for test output
  // reporters: ['default'],

  // Optionally, you can configure other Jest settings as needed
};

export default config;
