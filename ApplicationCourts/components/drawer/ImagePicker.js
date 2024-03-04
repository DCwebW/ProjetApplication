import React, { useState, useEffect } from 'react';
import {View,StyleSheet,Image,TouchableOpacity,Text,Alert,Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';

import { updateDoc, query,where,doc,collection, getDocs} from 'firebase/firestore'
import { onAuthStateChanged,getAuth } from 'firebase/auth';
import { db } from '../../ConfigFirebase'

const auth = getAuth()

export default function Avatar({results}) {


  const [image, setImage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [])


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


  // const uploadToCloudStorage = async () => {
  //   try {
  //     if (image) {
  //       const downloadURL = await uploadImageAsync(image);
  //       console.log("Image uploaded to Cloud Storage. Download URL:", downloadURL);
  //       // Vous pouvez ajouter d'autres actions ici, comme la mise à jour de votre base de données avec l'URL de téléchargement.
  //     } else {
  //       console.warn("Aucune image à télécharger.");
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors du téléchargement sur Cloud Storage:", error);
  //   }
  // };

const UpdateFirestoreDatabase = async(imageUrl)=>{
  try{
const Reference= collection(db, 'clients')
      const querySnapshot = await getDocs(query(Reference, where ('uid', '==', currentUser.uid)))
      if(!querySnapshot.empty){
        const docID = querySnapshot.docs[0].id
        const NewData={

          imageprofil:imageUrl
        }
        const specificDocRef = doc(db, 'clients',docID)
        await updateDoc(specificDocRef,NewData)
        console.log('Profil mis à jour avec ID =' ,currentUser.uid)
      }

  }catch(error){
    console.error("Erreur lors de la mise à jour de la base de données:", error)
  }
}


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