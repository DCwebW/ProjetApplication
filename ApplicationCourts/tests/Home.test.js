import Home from "../components/screens/Home";
import renderer from 'react-native-renderer'

jest.mock('firebase/firestore', () => ({
    // Définir les mocks pour Firestore si nécessaire
  }));
jest.mock('firebase/app', () => ({
    // Définir les mocks pour Firestore si nécessaire
  }));
jest.mock('firebase/auth', () => ({
    // Définir les mocks pour Firestore si nécessaire
  }));
jest.mock('firebase/storage', () => ({
    // Définir les mocks pour Firestore si nécessaire
  }));

describe("Home",()=>{

    it("has 9 child",()=>{
   const tree = renderer.create(<Home/>).toJSON() 
   expect(tree.children.length).toBe(9)  
    })


})