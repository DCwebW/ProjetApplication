import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Commentaire de test
// Deuxième Commentaire

const Connexionauto = () => {
  const auth = getAuth();
  const navigation = useNavigation();


  useEffect(() => {
    const checkUserLogin = async () => {
      console.log('Utilisation du useEffect');
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la connexion automatique', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      setUser(user);
    });

    checkUserLogin(); // Appeler votre vérification initiale ici

    return () => {
      // Nettoyer l'écouteur lorsque le composant est démonté
      unsubscribe();
    };
  }, [navigation, auth]);

  // Vous pouvez effectuer d'autres opérations ou renvoyer des éléments ici si nécessaire

  return null;
};

export default Connexionauto;
