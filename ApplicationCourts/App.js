import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import * as SplashScreen from 'expo-splash-screen'; // Importation de SplashScreen
import { useFonts } from 'expo-font';
import Login from './components/screens/Login';
import MotdepasseOublie from './components/screens/MotdepasseOublie';
import Inscription from './components/screens/Inscription';
import DrawerNavigator from './components/navigation/DrawerNavigator';
import { StyleSheet, View } from 'react-native';
import PolitiqueRGPD from './components/screens/PolitiqueRGPD';
import { FontProvider } from './components/ThemeContext/FontContext';

// Empêche le splash screen de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const auth = getAuth();

export default function App() {
  const [user, setUser] = useState(null);
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'Kanit-Light': require('./assets/fonts/Kanit-Light.ttf')
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      setAppReady(true);
      SplashScreen.hideAsync(); // Cache le splash screen une fois les polices chargées
    }
  }, [fontsLoaded]);

  if (!appReady) {
    return null; // Affiche un écran vide jusqu'à ce que tout soit prêt
  }

  return (
    <FontProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user ? 'Home' : 'Login'}
          screenOptions={{
            headerStyle: { backgroundColor: 'rgba(197, 44, 35,1)' },
            headerTintColor: 'white',
          }}
        >
          {user !== null ? (
            <Stack.Screen name='Home' component={DrawerNavigator} options={{ headerShown: false }}/>
          ) : (
            <>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen name='Reinitialisation Mot de passe' component={MotdepasseOublie} />
              <Stack.Screen name='Inscription' component={Inscription} />
              <Stack.Screen name='Politique de Confidentialité' component={PolitiqueRGPD} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </FontProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
