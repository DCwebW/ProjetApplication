import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'

const BoutonRetour = ({navigation}) => {
  return (
    <View style={{flex:1 , alignItems:'center',justifyContent:'center'}}>
      <Pressable style={styles.boutonretour} ><Text>Retour</Text></Pressable>
    </View>
  )
}
const styles = StyleSheet.create(
    {
      boutonretour:{
  
        backgroundColor:'rgba(197, 44, 35,1)',
        width:100,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20
      },
      textboutonretour:{
        
      }
    
    }
  )
export default BoutonRetour


  