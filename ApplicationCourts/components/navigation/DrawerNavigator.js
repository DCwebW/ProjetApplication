import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import CustomDrawerContent from '../drawer/DrawerContent';
import BottomTabNavigator from './BottomTabNavigation';
import { Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import LogoHeader from '../Logo/LogoHeader';
import CompteNavigation from './CompteNavigation';
import { useNavigation,CommonActions } from '@react-navigation/native';


const Drawer = createDrawerNavigator();


const Content= (props)=>{
  return (<CustomDrawerContent{...props} /> )
}


const Cogs = ()=>{
  return(<Pressable style={{marginRight:10}}><FontAwesome5 name='cogs' size={24} color='white'/></Pressable>)
}

function DrawerNavigator() {
const navigation = useNavigation()
const ReturnHome =()=>{
navigation.dispatch(
    CommonActions.reset({
  index:0,
  routes:[{name:'Accueil'}]
}))  
} // Ici C'est un bouton pour pouvoir revenir l'accueil
const Logo = ()=>{
  return( <Pressable onPress={ReturnHome}><LogoHeader/></Pressable>)
  }
  return (
    <Drawer.Navigator 
    initialRouteName='Accueil'
    drawerContent={Content}
    screenOptions={{
        headerStyle:{
          backgroundColor:'rgba(197, 44, 35,1)',
           height:100,
            borderRadius:20,
            borderBottomColor:'rgba( 20, 118, 199,0.3)',
          borderBottomWidth:2},
        headerTintColor:'white',
        }}>  
        <Drawer.Screen name="Accueil" component={BottomTabNavigator}
        options={{
           headerTitle: Logo,
          headerRight: Cogs
        }}
        />
      <Drawer.Screen name="MonCompte" component={CompteNavigation}  />
    
 
    </Drawer.Navigator>
  );
}

export default DrawerNavigator