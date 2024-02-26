import { StyleSheet, Text, View,ScrollView,TextInput,Pressable } from 'react-native'
import React ,{useState} from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import Map from '../Maps/ChoixAdresse'
import RadioButtons2 from '../RadioButtonsGroup/RadioButtons2'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'




const AjoutTerrain = () => {
  const [nomTerrain, setnomTerrain]= useState('')
  
  return (
    <ScrollView>
    <View>
      <BoutonRetour/>
      
    </View>
    <View style={styles.formulaireterrain}>
    
    <View style={{marginTop:20,marginLeft:15,flexDirection:'row'}}>
      <Text style={{marginLeft:10,marginBottom:20 ,color:'white'}}>Nom du terrain :</Text>

    </View>
    <View style={{width:300, alignItems:'center'}}>
      <TextInput placeholder='Mettez le nom du terrain 'onChangeText={(text)=>setnomTerrain(text)} value={nomTerrain} style={{backgroundColor:'white', minWidth:340,minHeight:40,borderRadius:10,marginTop:20, marginLeft:70}}></TextInput>
    </View>
    <View style={{marginTop:20,marginLeft:15,flexDirection:'row'}}>
      <Text style={{marginLeft:10,marginBottom:20 ,color:'white'}}>Type de filet :</Text>

    </View>
    <RadioButtons2 /> 
    <View style={{height:400, backgroundColor:'rgba(197, 44, 35,1)', marginTop:50}}>
      <Text style={{marginLeft:20,marginBottom:20 ,color:'white'}}>Localisation du terrain :</Text>
      <Map/></View>

      <View style={{flexDirection:'row'}}>
        <View style={{justifyContent:'center',}}>
          <Text>Photos :</Text>
        </View>
        <View style={{backgroundColor:'white',height:150,width:200, marginLeft:30,alignItems:'center',justifyContent:'center'}}>
          <View>
            <Pressable>
            <AntDesign name="pluscircle" size={40} color="grey" />
            </Pressable>
            </View>
        
        </View>
      </View>
      <View style={styles.boutonvalider}>
      
      <Pressable><Text style={{color:'white'}}>Valider </Text></Pressable></View>
    </View>
    
    
    </ScrollView>
  )
}

export default AjoutTerrain

const styles = StyleSheet.create({

  formulaireterrain: {
    flex: 1,
    backgroundColor: 'rgba(197, 44, 35,1)',
    width: '95%', // Utilisez '100%' pour occuper la largeur complète de l'écran
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    padding: 20, // Ajoutez une marge uniforme de tous les côtés
    marginBottom: 100, // Ajoutez une marge en bas pour inclure le bouton Valider
    shadowColor:'black',
shadowOffset:{height:0, width:10},
shadowOpacity:0.5,
shadowRadius:20,
  },
  boutonvalider:{

    backgroundColor:'rgba(156,29,21,1)',
    width:100,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    marginTop:30,
    marginLeft:10,
    alignSelf:'center',
    
  },
})