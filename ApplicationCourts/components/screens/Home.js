import { View, Text, ScrollView,StyleSheet,Modal,Pressable } from 'react-native'
import React,{useEffect,useState} from 'react'
import TerrainsFavoris from '../PageAccueil/TerrainsFavoris'
import MatchsOrganises from '../PageAccueil/MatchsOrganises'
import ConseilsSport from './ConseilsSport'
import CustomText from '../ThemeContext/CustomText'



const Home = () => {

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.section}>
        <CustomText style={styles.texttitre}> Terrains Favoris</CustomText>
        <TerrainsFavoris />
      </View>
      <View style={styles.section}>
        <CustomText style={styles.texttitre}>Matchs Organisés</CustomText>
        <MatchsOrganises />
      </View>
      <View style={[styles.section, { marginBottom: 50 }]}>
        <ConseilsSport />
      </View>
      
    </ScrollView>
    
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  scrollView: {
    flex: 1,
    margin: 10,
    marginTop: 0,
  },
  text: {
    fontSize: 42,
  },
  texttitre:{
    fontSize:25,
    textAlign: 'center',
    color:'rgba(197, 44, 35,1)'

  },
  section:{
    marginTop:20,
    marginBottom:20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 20,
    color: 'white',
  },
  modalButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  modalButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
