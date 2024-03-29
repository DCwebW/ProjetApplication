import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RechercheMap from '../Maps/RechercheTerrainMap'
import FicheTerrain from '../screens/FicheTerrain'




const Stack = createNativeStackNavigator()


const RechTerrainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Map' screenOptions={{headerShown:false}}>
<Stack.Screen name='RechercheMap' component={RechercheMap} />
<Stack.Screen name='Fiche' component={FicheTerrain}/>

    </Stack.Navigator>
  )
}

export default RechTerrainNavigator