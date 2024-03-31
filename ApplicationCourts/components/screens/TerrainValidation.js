import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation,CommonActions } from '@react-navigation/native'

const TerrainValidation = () => {
    const navigation = useNavigation()
    const ReturnHome =()=>{
        navigation.dispatch(
            CommonActions.reset({
          index:0,
          routes:[{name:'Accueil'}]
        }))  
        }
  return (
    <View>
        <View style={styles.terrainvalidation}>
            <Text style={styles.textvalidation}>Terrain Validé </Text>
            <Text>Vous pouvez retrouver votre terrain sur la carte</Text>
        </View>
      <View>
        <TouchableOpacity
        onPress={ReturnHome}>
            <Text>Revenir à l'accueil</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TerrainValidation

const styles = StyleSheet.create({
 terrainvalidation:{
    width:300,
    height:200,
    backgroundColor:'rgba(197, 44, 35,1)'
 },
 textvalidation:{
    color:'white',
    fontSize:'25'
 }
})