import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import BoutonRetour from '../navigation/BoutonRetour'

const AjoutTerrain = () => {
  return (
    <ScrollView>
    <View>
      <BoutonRetour/>
      
    </View>
    <View style={styles.formulaireterrain}>

    <View style={{marginTop:20,marginLeft:15,flexDirection:'row'}}>
      <Text>Nom du terrain</Text>
    </View>

    </View>
    </ScrollView>
  )
}

export default AjoutTerrain

const styles = StyleSheet.create({

  formulaireterrain:{
    flex:1,
    backgroundColor:'rgba(197, 44, 35,1)',
    width:380,
   height:500,
   alignSelf:'center',
    marginTop:20,
    borderRadius: 20
  }
})