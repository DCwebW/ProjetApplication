import React, { useEffect, useState,  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import AppLoading from 'expo-app-loading'; // Pour attendre que les polices soient chargées
import { useFonts } from 'expo-font';
import Login from './components/screens/Login';
import MotdepasseOublie from './components/screens/MotdepasseOublie';
import Inscription from './components/screens/Inscription';
import DrawerNavigator from './components/navigation/DrawerNavigator';
import { StyleSheet } from 'react-native';
import PolitiqueRGPD from './components/screens/PolitiqueRGPD';
import { FontProvider } from './components/ThemeContext/FontContext';


const Stack = createNativeStackNavigator();
const auth = getAuth();

export default function App() {
  const [user, setUser] = useState(null);
  
  
  const [fontsLoaded] = useFonts({
    'Kanit-Light': require('./assets/fonts/Kanit-Light.ttf')
  })
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      setUser(user);
    });

    return () => {
      // Nettoyer l'écouteur lorsque le composant est démonté
      unsubscribe();
    };
  },[])
  
  // commentaire pour Github Actions   

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <FontProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'} 
        screenOptions={{
          headerStyle: { backgroundColor: 'rgba(197, 44, 35,1)' },
          headerTintColor: 'white'
        }}
      >
        {user !== null ? (
          
            <Stack.Screen name='Home' component={DrawerNavigator} options={{ headerShown: false }}/>
          
        ) : (
          <>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Reinitialisation Mot de passe' component={MotdepasseOublie}  />
            <Stack.Screen name='Inscription' component={Inscription} />
            <Stack.Screen name='Politique de Confidentialité' component={PolitiqueRGPD}/> 
          </>
        )}
      </Stack.Navigator>

      {/* Ajout du composant Connexionauto */}
      {/* <Connexionauto /> */}
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
