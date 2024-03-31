import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import PageDebutAction from './PageDebutAction'
import AjoutTerrain from './AjoutTerrain'
import AjoutMatch from './AjoutMatch'
import TerrainsFavorisSelection from './TerrainsFavorisSelection'
import TerrainValidation from './TerrainValidation'

const Stack = createNativeStackNavigator()

const Actions = () => {
  return (
    
      <Stack.Navigator
       screenOptions={{headerShown:false}}>
      <Stack.Screen name='PageDebutAction' component={PageDebutAction}/>
      <Stack.Screen name='AjoutTerrain' component={AjoutTerrain}/>
      <Stack.Screen name='AjoutMatch' component={AjoutMatch} options={{headerShown:false}}/>
      <Stack.Screen name='TerrainValidation' component={TerrainValidation}/>
      <Stack.Screen name='TerrainsFavorisSelection' component={TerrainsFavorisSelection}/>
      </Stack.Navigator>
    
  )
}

export default Actions