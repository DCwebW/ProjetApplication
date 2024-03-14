import { View, Text, Button,ScrollView,StyleSheet,StatusBar } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../ConfigFirebase'
import BottomTabNavigator from '../navigation/BottomTabNavigation'
import { QueryDocumentSnapshot, doc, getDocs,collection, QuerySnapshot, addDoc, updateDoc,where, query } from "firebase/firestore"
import { db } from '../../ConfigFirebase'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import TerrainsFavoris from '../PageAccueil/TerrainsFavoris'
import MatchsOrganises from '../PageAccueil/MatchsOrganises'
import ConseilsSport from './ConseilsSport'


const Home = ({navigation}) => {
  return (
    <ScrollView style={{ flex:1 , margin: 10,marginTop:0}} >

<View style={{flex:1,marginTop:20}}>
  
  <Text style={styles.texttitre}> Terrains Favoris</Text></View>
      
      <View style={{flex:1,marginTop:20}}>

      <TerrainsFavoris/>
      </View>
      <View style={{flex:1}}><Text style={styles.texttitre}>
          Matchs Organisés
        </Text></View>
      <View style={{flex:1, marginTop:20}}><MatchsOrganises/></View>
      
      <View style={{flex:1, marginTop:50}}><ConseilsSport/></View>
      
      
      
    </ScrollView>
    
  )
}

export default Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  texttitre:{
    fontSize:25,
    textAlign: 'center',
    color:'rgba(197, 44, 35,1)'

  }
});