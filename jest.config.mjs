export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],
  testPathIgnorePatterns: ["<rootDir>/.next/"],
  transformIgnorePatterns: ["/node_modules/(?!module-to-transform)", ],
};