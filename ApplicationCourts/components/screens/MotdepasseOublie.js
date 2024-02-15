import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const MotdepasseOublie = () => {

const route = useRoute()
  return (
    <View style={styles.Parametres}>
      <Text >MotdepasseOublie</Text>
      <Text>UID : {route.params.userId}</Text>
    </View>
  )
}

export default MotdepasseOublie

const styles = StyleSheet.create({

    Parametres:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        
    }

})