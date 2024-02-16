import { View, Text } from 'react-native'
import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';
  import { FIREBASE_AUTH } from '../../ConfigFirebase'
  import MonCompte from './MonCompteInfos';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useNavigation } from '@react-navigation/native'

const CustomDrawerContent = (props,) => {
  const navigation = useNavigation()
const SignOut =async()=>{
  try{
  await AsyncStorage.removeItem('userToken')
  FIREBASE_AUTH.signOut()
  console.log("Déconnexion")
  
  
}catch(error){
  console.error('Déconnexion échouée')
}}
    const Deconnexion =()=>{
        return <Text style={{color:'rgba(197, 44, 35,1)'}}>Deconnexion</Text>
    }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label= {Deconnexion}
        
        onPress={ () => SignOut() }
      />
     
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent