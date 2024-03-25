import Home from "../components/screens/Home";
import { View } from "react-native";
import renderer from 'react-native-renderer'
import { initializeApp } from 'firebase/app';
import { LinearGradient, } from 'expo-linear-gradient';




jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn()// Définir les mocks pour Firestore si nécessaire
  }));
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn()
    // Définir les mocks pour Firestore si nécessaire
  }));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn()
    // Définir les mocks pour Firestore si nécessaire
  }));
jest.mock('firebase/storage', () => ({
  getStorage : jest.fn()
    // Définir les mocks pour Firestore si nécessaire
  }));

  
  jest.mock('expo-linear-gradient', () => {
    const { View } = require('react-native');
    const LinearGradient = (props) => {
      const { style, colors } = props;
      const backgroundColor = Array.isArray(colors) && colors.length > 0 ? colors[0] : 'transparent';
      return <View {...props} style={[style, { backgroundColor }]} />;
    };
    return { LinearGradient };
  });
  

describe("Home",()=>{

    it("has 9 child",()=>{
   const tree = renderer.create(<Home/>).toJSON() 
   expect(tree.children.length).toBe(9)  
    })


})