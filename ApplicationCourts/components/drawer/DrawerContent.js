import { View, Text } from 'react-native'
import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';
  import { FIREBASE_AUTH } from '../../ConfigFirebase'
  import MonCompte from './MonCompteInfos';

const CustomDrawerContent = (props) => {

    const Deconnexion =()=>{
        return <Text style={{color:'rgba(197, 44, 35,1)'}}>Deconnexion</Text>
    }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label= {Deconnexion}
        
        onPress={() => FIREBASE_AUTH.signOut()}
      />
     
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent