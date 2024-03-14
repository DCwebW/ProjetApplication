import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import FicheTerrainHome from '../screens/FicheTerrainHome'
import FicheMatch from '../screens/FicheMatch'


const Stack = createNativeStackNavigator()
const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='PageAccueilDebut'component={Home}/>
        <Stack.Screen name='FicheTerrainHome' component={FicheTerrainHome}/>
        <Stack.Screen name='FicheMatch' component={FicheMatch} />
    </Stack.Navigator>
  )
}

export default HomeNavigator