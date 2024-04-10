import { StyleSheet, Text, View,ScrollView,TextInput,Pressable } from 'react-native'
import React ,{useState} from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import AdresseMap from '../Maps/ChoixAdresse';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { db,storage } from '../../ConfigFirebase'
import { addDoc, query,where,doc,collection, getDocs} from 'firebase/firestore'
import { RadioButton } from 'react-native-paper';
import Imagesterrain from '../ManipulationImages/ImagePicker2';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { useNavigation,CommonActions } from '@react-navigation/native';



const AjoutTerrain = () => {
  const [nomTerrain, setnomTerrain]= useState('')
  
  const [checked, setChecked] = useState('first');
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState()
  const [imagesTerrains,setImagesTerrains]=useState('')
  const navigation= useNavigation()
  


  const handleAdresseLocaliseeChange = (nouvelleAdresse) => {
    setAddress(nouvelleAdresse);
  };
  const handlePosition = (nouvellePosition) =>{
    setPosition(nouvellePosition)
  }
  const handleImageTerrain =(nouvellesImages)=>{
       setImagesTerrains(nouvellesImages)
       console.log(nouvellesImages)
  }


  const createBlobFromUri = async (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.error(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };  
  
  const uploadImageAsync = async (uri) => {
    try {
      const blob = await createBlobFromUri(uri);
      const storageRef = ref(storage, `imagesterrains/image-${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      if(downloadURL){
blob.close();
console.log('Envoi réussi sur CloudStorage')
      return downloadURL;
      
      }
      
    } catch (error) {
      console.error(error);
      throw new Error("L'URL de téléchargement est nulle"); // Rethrow the error to handle it elsewhere if needed
    }
  }
  


;


  const EnvoiTerrain= async()=>{

    try{
      if(imagesTerrains.length > 0){

      const imageURL = await uploadImageAsync(imagesTerrains)
      
      
      await addDoc(collection(db,'terrains'),{

        name: nomTerrain,
        typefilet : checked,
        adresse : address,
        latitude: position.latitude,
        longitude: position.longitude,
        images:imageURL
      })

      }
 console.log('Terrain Enregistré')
 navigation.navigate('TerrainValidation')
 
    }catch(error){

      console.error('Erreur enregistrement du terrain', error)
    }
    
  }
  
  return (
    <ScrollView>
    <View>
      <BoutonRetour/>
      
    </View>
    <View><Text style={{color: 'rgba(197, 44, 35,1)', fontSize:25, textAlign:'center'}}> Ajouter un terrain</Text></View>
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



    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
      <View style={{backgroundColor:'white',borderRadius:20}}>
      <RadioButton
        value="filet"
        status={ checked === 'filet' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('filet')}
        
      /></View>
      <Text>filet</Text>
      <View style={{backgroundColor:'white',borderRadius:20}}>
      <RadioButton
        value="chaines"
        status={ checked === 'chaines' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('chaines')}
        
      /></View>
      <Text>chaines</Text>
      <View style={{backgroundColor:'white',borderRadius:20,}}>
      <RadioButton
        value="sans filet"
        status={ checked === 'sans filet' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('sans filet')}
        
      /></View>
      <Text>sans filet</Text>
      </View>
     
      
    <View style={{height:400, backgroundColor:'rgba(197, 44, 35,1)', marginTop:50}}>
      <Text style={{marginLeft:20,marginBottom:20 ,color:'white'}}>Localisation du terrain :</Text>
      <AdresseMap onAdresseLocaliseeChange={handleAdresseLocaliseeChange} adresse={address} onPositionChange={handlePosition} /></View>
      {/* Ici est rappelé la fonction de rappel mise en prop dans le composant Map */}
      <View style={{flexDirection:'row', marginTop:30,width:250, }}>
        <View style={{justifyContent:'center',}}>
          <Text>Photos :</Text>   
        </View>
       {/* <Imagesterrain/> */}
       <View style={{backgroundColor:'white',height:300,width:290, marginLeft:15,marginTop:30}}>
        
          <Imagesterrain imagesterrains={handleImageTerrain}/>
        
        </View>
      </View>
      <View style={styles.boutonvalider}>
      
      <Pressable onPress={()=> EnvoiTerrain()}><Text style={{color:'white'}}>Valider </Text></Pressable></View>
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