// jest.setup.js

// Mock pour react-native-gesture-handler avant tout
import 'react-native-gesture-handler/jestSetup';

import { NativeModules } from 'react-native';

// Mock pour UIManager
NativeModules.UIManager = {
  getViewManagerConfig: jest.fn().mockReturnValue({}),
};

// Mock de react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    GestureHandlerRootView: ({ children }) => children,
  };
});


// Mock pour react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = jest.fn();
  return Reanimated;
});



// Mock pour react-native-screens
jest.mock('react-native-screens', () => {
  return {
    enableScreens: jest.fn(),
  };
});

// Assure-toi que les imports suivants viennent après les mocks
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./ConfigFirebase2";
