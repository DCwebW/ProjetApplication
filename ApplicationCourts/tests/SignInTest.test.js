// Votre test qui utilise Firebase
import firebase from '@firebase/auth'; // Assurez-vous que le chemin correspond à celui défini dans le moduleNameMapper

test('signInWithEmail returns the user', async () => {
  const user = await firebase.signInWithEmailAndPassword('test@example.com', 'password');
  expect(user).toEqual('mocked-user');
});
