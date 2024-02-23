import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { storage } from '../../ConfigFirebase';



export default function Avatar() {
  const [image, setImage] = useState(null);

  
  const uploadToCloudStorage = async () => {
    try {
      if (image) {
        const downloadURL = await uploadImageAsync(image);
        console.log("Image uploaded to Cloud Storage. Download URL:", downloadURL);
        // Vous pouvez ajouter d'autres actions ici, comme la mise à jour de votre base de données avec l'URL de téléchargement.
      } else {
        console.warn("Aucune image à télécharger.");
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement sur Cloud Storage:", error);
    }
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
      
    }}catch(error){
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
      
      // setImage(result.assets[0].uri);
     const uploadURL= await uploadImageAsync(result.assets[0].uri)
     setImage(uploadURL)
    }
  };
  const uploadImageAsync = async (uri) => {
    try {
      const blob = await createBlobFromUri(uri);
      const storageRef = ref(storage, `images/image-${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      blob.close();
      return downloadURL;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  };

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

  

  

  

const showImagePickerOptions = () => {
  Alert.alert(
    'Choisissez une option 📸',
    'Voulez-vous choisir une image de votre bibliothèque ou prendre une nouvelle photo?',
    [
      {
        text: 'Choisir de la bibliothèque',
        onPress: pickImage,
      },
      {
        text: 'Prendre une photo',
        onPress: takePhoto,
      },
      {
        text: 'Annuler',
        onPress: () => {}, // Ne fait rien, ferme simplement l'alerte
        style: 'cancel', // Style iOS pour indiquer une action d'annulation
      },
    ]
  );
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