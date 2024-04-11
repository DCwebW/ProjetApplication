import React ,{Pressable}from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer'
import { useNavigation } from '@react-navigation/native';
import BoutonRetour from '../components/navigation/BoutonRetour';


jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('BoutonRetour', () => {
    test('renders correctly', () => {
      // Mock the navigation function
      const navigateMock = jest.fn();
      useNavigation.mockReturnValue({ goBack: navigateMock });
  
      // Render the component
      const component = renderer.create(<BoutonRetour />);
  
      // Retrieve the root instance of the rendered component
      const rootInstance = component.root;
  
      // Simulate a press event on the Pressable component
      
rootInstance.findByProps({testID:'boutonRetour'}).props.onPress();

  
      // Check if the navigation function is called
      expect(navigateMock).toHaveBeenCalled();
    });
  });
  
