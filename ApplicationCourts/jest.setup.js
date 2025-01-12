import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./ConfigFirebase";
// jest.setup.js
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-gesture-handler', () => {
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    GestureHandlerRootView: ({ children }) => children,
  };
});



const firebaseApp = initializeApp(firebaseConfig);