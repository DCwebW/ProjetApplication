import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MonCompte from '../drawer/MonCompteInfos'
import ChangerInfos from '../screens/ChangerInfos'

const Stack = createNativeStackNavigator()
const CompteNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Compte' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Compte' component={MonCompte}/>
        <Stack.Screen name='ChangerInfos' component={ChangerInfos}/>
    </Stack.Navigator>
  )
}

export default CompteNavigation