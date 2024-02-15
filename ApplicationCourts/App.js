import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import Login from './components/screens/Login';
 import { useEffect,useState } from 'react';
 import { User, onAuthStateChanged,getAuth,initializeAuth,browserLocalPersistence,} from 'firebase/auth';
 import { FIREBASE_AUTH ,FIREBASE_APP} from './ConfigFirebase';
 import { ReactNativeAsyncStorage, setPersistence} from 'firebase/auth';
 import MotdepasseOublie from './components/screens/MotdepasseOublie';
import Inscription from './components/screens/Inscription';
  import DrawerNavigator from './components/navigation/DrawerNavigator';

const Stack = createNativeStackNavigator();
const auth =  getAuth()

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home':'Login'} 
      screenOptions={{
        headerStyle:{backgroundColor:'rgba(197, 44, 35,1)'},
        headerTintColor:'white'
      }} >
        {user ? (
        <>
        <Stack.Screen name='Home' component={DrawerNavigator} options={{ headerShown: false }}/>
        
       </> 
        ) : (
        <><Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Motdepasse' component={MotdepasseOublie} options={({route})=>({title: route.params.userId})} />
        <Stack.Screen name= 'Inscription' component={Inscription}/>
        </>
        )}

      </Stack.Navigator>


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
