import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import CustomDrawerContent from '../drawer/DrawerContent';
import BottomTabNavigator from './BottomTabNavigation';
import { Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import LogoHeader from '../Logo/LogoHeader';
import CompteNavigation from './CompteNavigation';


const Drawer = createDrawerNavigator();


const Content= (props)=>{
  return (<CustomDrawerContent{...props} /> )
}

const Logo = ()=>{
return( <LogoHeader/>)
}
const Cogs = ()=>{
  return(<Pressable style={{marginRight:10}}><FontAwesome5 name='cogs' size={24} color='white'/></Pressable>)
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
    initialRouteName='Home'
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