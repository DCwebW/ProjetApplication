
  module.exports = {
    setupFiles: ['./jest.setup.js'],
    preset: 'react-native',
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@react-native)',
    ],
    moduleNameMapper: {
      '^@firebase/auth$': '<rootDir>/__mocks__/firebase.js',
      '^@firebase/firestore$': '<rootDir>/__mocks__/firebase.js',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.m?js$': 'babel-jest',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '/error-guard.js'],
  };
  
  