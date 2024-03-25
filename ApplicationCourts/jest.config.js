module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
      },
      setupFilesAfterEnv: ['./jest.setup.js'],
      
  };
  