import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const BoutonRetour = () => {
  const navigation = useNavigation()
  return (
    <View style={{flex:1 }}>
      <Pressable  
      testID='boutonRetour'
      style={styles.boutonretour} onPress={navigation.goBack}><Text style={styles.textboutonretour}> Retour</Text></Pressable>
    </View>
  )
}
const styles = StyleSheet.create(
    {
      boutonretour:{
  
        backgroundColor:'rgba(197, 44, 35,1)',
        width:100,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginTop:30,
        marginLeft:10
      },
      textboutonretour:{
        color:'white'
      }
    
    }
  )
export default BoutonRetour


  