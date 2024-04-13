// __mocks__/firebase.js



const firebaseMock = {
    signInWithEmailAndPassword: jest.fn().mockResolvedValue('mocked-user'),
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue('mocked-createduser')
    // Ajoutez d'autres fonctions Firebase simulées ici
  };
  
  export default firebaseMock;
  