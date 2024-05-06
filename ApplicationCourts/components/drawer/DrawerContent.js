import {  Text } from 'react-native'
import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';
  import { FIREBASE_AUTH } from '../../ConfigFirebase2'



const Deconnexion = () =>{
  return (<Text style={{color:'rgba(197, 44, 35,1)'}}>Deconnexion</Text>)
}

const CustomDrawerContent = (props,) => {
const SignOut =async({navigation})=>{
  try{
  
  FIREBASE_AUTH.signOut()
  console.log("Déconnexion")
  
}catch(error){
  console.error('Déconnexion échouée')
}}




   
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label= {Deconnexion}
        
        onPress={
           SignOut 

        
        }
      />
     
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent