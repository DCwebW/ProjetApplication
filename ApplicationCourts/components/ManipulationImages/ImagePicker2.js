import React, { useState, useEffect } from 'react';
import {View,StyleSheet,Image,TouchableOpacity,Text,Alert,Pressable,FlatList} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { storage } from '../../ConfigFirebase';
import { onAuthStateChanged,getAuth } from 'firebase/auth';
import md5 from 'md5';


const auth = getAuth()

export default function Imagesterrain({imagesterrains}) {


  const [images, setImages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [])



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



  const pickImage = async () => {
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection:true
    });
    console.log(result);
    if (!result.canceled) {
      // const uploadURL= await uploadImageAsync(result.assets[0].uri)
      const selectedImages = result.assets.map((asset) => asset.uri)
      setImages((prevImages)=>[...prevImages,...result.assets]);
      
      imagesterrains((prevImages) => [...prevImages, ...selectedImages]);
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
      
      
    //  const uploadURL= await uploadImageAsync(result.assets[0].uri)
     setImages((prevImages) => [...prevImages, ...result.assets]);
     
    }
  };
  const uploadImageAsync = async (uri) => {
    try {
      const blob = await createBlobFromUri(uri);
      const storageRef = ref(storage, `imagesterrains/image-${Date.now()}`);
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

const renderItem = ({ item }) => {
  if (item.uri) {
    return (
      <Image source={{ uri: item.uri }} style={{ width: 200, height: 250,marginHorizontal:10 }} />
    );
  } else {
    return (
      <View style={{ width: 60, height: 40, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Chargement...</Text>
      </View>
    );
  }
};

const keyExtractor = (item) => (item.uri ? md5(item.uri) : Math.random().toString(36).substring(7)); // Utilisez md5 ou une autre méthode de hachage
  return (
    <View style={styles.container}>
      

      {!images.length && (<View style={{}}>
            <TouchableOpacity
            
            onPress={()=>showImagePickerOptions()}>
            <AntDesign name="pluscircle" size={40} color="grey" />
            </TouchableOpacity>
            </View>
      )}

      {images.length > 0 && (
        <View>
         <FlatList
         data={images} 
         renderItem={
          renderItem
         }
         keyExtractor={keyExtractor} // Utilisation de l'index de chaque image comme clé pour chaque élément
         horizontal={true} 
         >


         </FlatList>
        
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
    borderRadius: 75,
  },
});