import { StyleSheet,Pressable, } from 'react-native'
import React from 'react'
import CustomText from './ThemeContext/CustomText';

//Un commentaire pour SonarQube
// Un deuxième essai 
// Troisième Essai


const BoutonValider = ({onPress}) => {
  return (
    
      <Pressable style={styles.boutonvalider} onPress={onPress} ><CustomText style={styles.textboutonvalider}> Valider</CustomText></Pressable>
    )
}

export default BoutonValider

const styles = StyleSheet.create(  {
    boutonvalider:{

      backgroundColor:'rgba(197, 44, 35,1)',
      width:100,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10,
  
      marginLeft:10
    },
    textboutonvalider:{
      color:'white'
    },
    
    
})