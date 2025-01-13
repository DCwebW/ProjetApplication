module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo|firebase|@firebase|react-native-safe-area-context|react-native-gesture-handler|react-native-reanimated|react-native-screens)',
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^@firebase/auth$': '<rootDir>/__mocks__/firebase.js',
    '^@firebase/firestore$': '<rootDir>/__mocks__/firebase.js',
    '^react-native-safe-area-context$': '<rootDir>/__mocks__/react-native-safe-area-context.js',
    '^react-native-masked-view$': '<rootDir>/__mocks__/react-native-masked-view.js',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Transformation pour JS et TS
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '/error-guard.js'], // Ignore les chemins spécifiques
};
