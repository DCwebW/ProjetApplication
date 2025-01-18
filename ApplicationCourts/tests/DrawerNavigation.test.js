// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import DrawerNavigator from '../components/navigation/DrawerNavigator';
// import 'react-native-gesture-handler/jestSetup';



// jest.mock('@react-navigation/drawer', () => {
//     const actualModule = jest.requireActual('@react-navigation/drawer');
//     return {
//       ...actualModule,
//       createDrawerNavigator: jest.fn().mockReturnValue({
//         Navigator: ({ children }) => <>{children}</>,
//         Screen: ({ children }) => <>{children}</>,
//       }),
//     };
//   });
  
//   jest.mock('../components/drawer/DrawerContent', () => jest.fn(() => <div>Custom Drawer</div>));
  
//   jest.mock('@expo/vector-icons', () => ({ FontAwesome5: jest.fn(() => <div>Icon</div>) }));
//   jest.mock('../components/Logo/LogoHeader', () => jest.fn(() => <div>Logo</div>));
//   jest.mock('../components/navigation/BottomTabNavigation', () => jest.fn(() => <div>BottomTabNavigation</div>));
//   jest.mock('../components/navigation/CompteNavigation', () => jest.fn(() => <div>CompteNavigation</div>));
//   jest.mock('react-native-gesture-handler', () => {
//     const actual = jest.requireActual('react-native-gesture-handler');
//     return {
//       ...actual,
//       GestureHandlerRootView: ({ children }) => children,
//     };
//   });
  
  
//   describe('DrawerNavigator', () => {
//     const renderWithNavigation = () => {
//       return render(
//         <NavigationContainer>
//           <DrawerNavigator />
//         </NavigationContainer>
//       );
//     };
  
//     test('renders the initial route Accueil', () => {
//       const { getByText } = renderWithNavigation();
//       expect(getByText('BottomTabNavigation')).toBeTruthy();
//     });
  
//     test('navigates to MonCompte when MonCompte screen is clicked', async () => {
//       const { getByText, findByText } = renderWithNavigation();
  
//       // Simule le clic sur l'élément du drawer
//       fireEvent.press(getByText('MonCompte'));
  
//       // Vérifie que le composant de la page MonCompte est affiché
//       expect(await findByText('CompteNavigation')).toBeTruthy();
//     });
  
//     test('header logo returns to Accueil', async () => {
//       const { getByText, findByText } = renderWithNavigation();
  
//       // Simule la navigation vers une autre page
//       fireEvent.press(getByText('MonCompte'));
//       expect(await findByText('CompteNavigation')).toBeTruthy();
  
//       // Simule le clic sur le logo
//       fireEvent.press(getByText('Logo'));
  
//       // Vérifie que la page Accueil est affichée
//       expect(await findByText('BottomTabNavigation')).toBeTruthy();
//     });
//   });
  