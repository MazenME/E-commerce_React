import type { Config } from "jest";

const config: Config = {
  // Use ts-jest to transform TypeScript files
  preset: "ts-jest",

  // Simulate browser environment (needed for React + DOM)
  testEnvironment: "jsdom",

  // Run setup file after the test framework is installed (adds jest-dom matchers)
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // Map path aliases (@/*) to match tsconfig paths
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Transform TS/TSX with ts-jest, overriding settings incompatible with Jest
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          verbatimModuleSyntax: false,  // Jest needs CJS imports, not ESM-only
          noUnusedLocals: false,         // Relax in tests
          noUnusedParameters: false,
          module: "commonjs",            // Jest runs in CJS mode
          jsx: "react-jsx",
          paths: { "@/*": ["./src/*"] },
        },
      },
    ],
  },

  // Don't transform node_modules
  transformIgnorePatterns: ["/node_modules/"],

  // Where Jest discovers test files
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(ts|tsx)",
    "<rootDir>/src/**/*.(spec|test).(ts|tsx)",
  ],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  verbose: true,
};

export default config;
