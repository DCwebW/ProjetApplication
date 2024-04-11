// __mocks__/firebase.js



const firebaseMock = {
    signInWithEmailAndPassword: jest.fn().mockResolvedValue('mocked-user'),
    // Ajoutez d'autres fonctions Firebase simulées ici
  };
  
  export default firebaseMock;
  