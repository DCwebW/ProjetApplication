import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types';


//Un commentaire pour SonarQube
// Un deuxième essai 
// Troisième Essai

const BoutonValider = ({onPress}) => {
  return (
    
      <Pressable style={styles.boutonvalider} onPress={onPress} ><Text style={styles.textboutonvalider}> Valider</Text></Pressable>
    )
}
BoutonValider.PropTypes ={
  onPress: PropTypes.bool
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
    }
  
  })