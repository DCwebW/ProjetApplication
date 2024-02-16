import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/screens/Login';
import MotdepasseOublie from './components/screens/MotdepasseOublie';
import Inscription from './components/screens/Inscription';
import DrawerNavigator from './components/navigation/DrawerNavigator';
import Connexionauto from './components/Connexionauto';
import { StyleSheet } from 'react-native';
const Stack = createNativeStackNavigator();
const auth = getAuth();

export default function App() {
  const [user, setUser] = useState(null);

  

 

    useEffect(() => {
      const checkLoginStatus = async () => {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setUser(true); // L'utilisateur est connecté
        } else {
          setUser(null); // L'utilisateur n'est pas connecté
        }
      };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      setUser(user);
    });
    checkLoginStatus();
    return () => {
      // Nettoyer l'écouteur lorsque le composant est démonté
      unsubscribe();
    };
  }, []);

 

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: 'rgba(197, 44, 35,1)' },
          headerTintColor: 'white'
        }}
      >
        {user  ? (
          <>
            <Stack.Screen name='Home' component={DrawerNavigator} options={{ headerShown: false }}/>
          </>
        ) : (
          <>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Motdepasse' component={MotdepasseOublie} options={({ route }) => ({ title: route.params.userId })} />
            <Stack.Screen name='Inscription' component={Inscription} />
            
          </>
        )}
      </Stack.Navigator>

      {/* Ajout du composant Connexionauto */}
      {/* <Connexionauto /> */}
    </NavigationContainer>
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
