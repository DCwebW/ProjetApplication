import React, { useState,  } from 'react';
import {View,StyleSheet,Image,TouchableOpacity,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';



const auth = getAuth()

export default function Imagesterrain({imagesterrains}) {


  const [image, setImage] = useState(null);
  


  const pickImage = async () => {
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      // allowsMultipleSelection:true
    });
    console.log(result);
    if (!result.canceled) {
     
      // const selectedImages = result.assets.map((asset) => asset.uri)
      // setImages((prevImages)=>[...prevImages,...result.assets]); Ceci est à utiliser si la sélection est multiple 
      setImage(result.assets[0].uri)
     
      imagesterrains(result.assets[0].uri)
    }
  
  
  }catch(error){
      console.error("Erreur lors de la sélection de l'image:", error)
    }
    };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection : true
    });
    if (!result.canceled) {
      
      
   
    setImage(result.assets[0].uri)
    imagesterrains(result.assets[0].uri)
    }
  };


const showImagePickerOptions = async () => {
  Alert.alert(
    'Choisissez une option 📸',
    'Voulez-vous choisir une image de votre bibliothèque ou prendre une nouvelle photo?',
    [
      {
        text: 'Choisir de la bibliothèque',
        onPress: await pickImage(),
      },
      {
        text: 'Prendre une photo',
        onPress: await takePhoto(),
      },
      {
        text: 'Annuler',
        onPress: () => {}, // Ne fait rien, ferme simplement l'alerte
        style: 'cancel', // Style iOS pour indiquer une action d'annulation
      },
    ]
  );
};



//  const keyExtractor = (item) => (item.uri ? md5(item.uri) : Math.random().toString(36).substring(7)); // Utilisez md5 ou une autre méthode de hachage
  return (
    <View style={styles.container}>
      {!image && (
        <View style={{}}>
          <TouchableOpacity onPress={() => showImagePickerOptions()}>
            <AntDesign name="pluscircle" size={40} color="grey" />
          </TouchableOpacity>
        </View>
      )}

      {image && (
        <View style={{ justifyContent: 'center',flexDirection:'row' }}>
          <Image source={{ uri: image }} style={{ width: 200, height: 250, marginHorizontal: 10 }} />
          <TouchableOpacity onPress={() => showImagePickerOptions()}>
            <AntDesign name="pluscircle" size={40} color="grey" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    marginTop:10
    
  },
  introText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
});