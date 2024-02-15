import { View, Text, Button,ScrollView,StyleSheet,StatusBar } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../ConfigFirebase'
import BottomTabNavigator from '../navigation/BottomTabNavigation'




const Home = ({navigation}) => {
  return (
    <ScrollView style={{ flex:1 , margin:20,marginTop:0}} >
      
      <View style={{backgroundColor:'red',flex:1}}><Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text></View>
      <View style={{backgroundColor:'yellow',flex:1}}><Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text></View>
      <View style={{backgroundColor:'orange',flex:1}}></View>
      <View style={{backgroundColor:'green',flex:1}}></View>
      <View style={{backgroundColor:'blue',flex:1}}></View>
      <View style={{backgroundColor:'violet',flex:1}}></View>
      
      
      
    </ScrollView>
    
  )
}

export default Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});