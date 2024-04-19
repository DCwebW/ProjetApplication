import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ChangerInfos from '../components/screens/ChangerInfos';


// Mock pour simuler les dépendances (firebase, navigation, etc.)
jest.mock('firebase/firestore', () => ({
  // Définir les mocks pour Firestore si nécessaire
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    dispatch: jest.fn(),
  })),
  CommonActions: {
    reset: jest.fn(),
  },
}));

describe('ChangerInfos', () => {
  test('Appel de la fonction updateData lorsqu\'on appuie sur le bouton de validation', async () => {
    const { getByTestId } = render(<ChangerInfos route={{ params: { nom: 'Nom', prénom: 'Prénom', image: 'image-url' } }} />);

    // Sélectionner le bouton de validation par son testID
    const boutonValider = getByTestId('validerButton');

    // Simuler un clic sur le bouton de validation
    fireEvent.press(boutonValider);

    // Attendre que la fonction updateData soit appelée
    await waitFor(() => {
      // Ajoutez ici les assertions supplémentaires si nécessaire
    });

    // Ajoutez ici les assertions supplémentaires si nécessaire après que la fonction updateData ait été appelée
  });
});
