module.exports = {
    transform: {
      "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest",
    },
    moduleNameMapper: {
      "^@(.*)$": "<rootDir>/src/$1",
    },
    testMatch: [
      "<rootDir>/src/**/__tests__/**/*.(js|jsx|mjs)",
      "<rootDir>/src/**/*.(spec|test).(js|jsx|mjs)",
    ],
    moduleFileExtensions: [
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
      "node",
    ],
  };