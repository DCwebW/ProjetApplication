import React, { useState } from 'react';
import {View,StyleSheet,Image,TouchableOpacity,Alert} from 'react-native';
import { Ionicons,Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


import { getAuth } from 'firebase/auth';


const auth = getAuth()

export default function Avatar({results}) {


  const [image, setImage] = useState(null);



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
        onPress: await  takePhoto(),
      },
      {
        text: 'Annuler',
        onPress: () => {}, // Ne fait rien, ferme simplement l'alerte
        style: 'cancel', // Style iOS pour indiquer une action d'annulation
      },
    ]
  );
};

const pickImage = async () => {
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
     
      setImage(result.assets[0].uri);
     results(result.assets[0].uri)
    }
  
  
  }catch(error){
      console.error("Erreur lors de la sélection de l'image:", error)
    }
    };

   const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      
      setImage(result.assets[0].uri);
      results(result.assets[0].uri)
    
    }
  };







  return (
    <View style={styles.container}>
      

      {!image && (<View>
        
          <View style={{ borderRadius: 300, overflow: 'hidden', position:'absolute',alignItems:'center' }}>
            <Ionicons name="image" size={150} color="grey" />
          </View>
        <TouchableOpacity onPress={showImagePickerOptions}>
          <View style={{position:'relative',marginLeft:120,marginTop:15}}>
          <Entypo name="edit" size={24} color="rgba(197, 44, 35,1)" />
          </View>
        </TouchableOpacity>
        
        </View>
      )}

      {image && (
        <View>
          <View style={{ borderRadius: 300, overflow: 'hidden', position:'absolute',alignItems:'center' }}>
          <Image source={{ uri: image }} style={styles.image} />
          </View>
        <TouchableOpacity onPress={showImagePickerOptions}>
          <View style={{position:'relative',marginLeft:120,marginTop:15}}>
          <Entypo name="edit" size={24} color="rgba(197, 44, 35,1)" />
          </View>
        </TouchableOpacity>
        </View>
      )}
      {/* <Pressable><Text style={{marginTop:100}} onPress={uploadToCloudStorage} >Envoyer sur Cloud Storage </Text></Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
  },
  introText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});