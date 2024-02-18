import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'

const BoutonValider = () => {
  return (
    <View style={{flex:1 }}>
      <Pressable style={styles.boutonvalider} ><Text style={styles.textboutonvalider}> Valider</Text></Pressable>
    </View>)
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
      marginTop:30,
      marginLeft:10
    },
    textboutonvalider:{
      color:'white'
    }
  
  })