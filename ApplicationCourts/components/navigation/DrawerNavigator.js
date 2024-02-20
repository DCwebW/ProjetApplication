import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import CustomDrawerContent from '../drawer/DrawerContent';
import Details from '../screens/Details';
import Home from '../screens/Home';
import Actions from '../screens/Actions';
import Recherche from '../screens/Recherche';
import BottomTabNavigator from './BottomTabNavigation';
import MonCompteInfos from '../drawer/MonCompteInfos';
import { Image,Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LogoHeader from '../Logo/LogoHeader';


const Drawer = createDrawerNavigator();


function DrawerNavigator() {
  return (
    <Drawer.Navigator 
    initialRouteName='Home'
    drawerContent={(props)=><CustomDrawerContent{...props} /> }
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
           headerTitle: ()=>(<LogoHeader/>),
          headerRight:()=>(<Pressable style={{marginRight:10}}><FontAwesome5 name='cogs' size={24} color='white'/></Pressable>)
        }}
        />
      <Drawer.Screen name="MonCompte" component={MonCompteInfos}  />
    
 
    </Drawer.Navigator>
  );
}

export default DrawerNavigator