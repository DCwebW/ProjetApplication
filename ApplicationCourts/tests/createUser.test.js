
import firebase from '@firebase/auth'; // Importez firebase en tant qu'objet, pas en tant que destructuré

// Utilisez jest.mock avec une fonction pour définir le mock
test('User created', async () => {
    const user = await firebase.createUserWithEmailAndPassword('test@example.com', 'password');
    expect(user).toEqual('mocked-createduser');
  });
  
