import messaging from '@react-native-firebase/messaging';

const getFirebaseInstallationId = async () => {
  try {
    const id = await messaging().getToken();
    console.log('Firebase Installation ID:', id);
    return id;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'ID Firebase Installations:', error);
  }
};

export default getFirebaseInstallationId