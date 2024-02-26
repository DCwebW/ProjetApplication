import { StyleSheet, Text, View,FlatList,ScrollView, Pressable,Image } from 'react-native'
import React from 'react'
import { QueryDocumentSnapshot, doc, getDocs } from "firebase/firestore"
import { db, } from '../../ConfigFirebase'
import { collection } from 'firebase/firestore'
import { useState,useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Avatar from './ImagePicker'
import { useNavigation } from '@react-navigation/native'
const auth = getAuth();
  


const MonCompte = () => {
  
const navigation = useNavigation()
const [currentUser, setCurrentUser] = useState(null);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });
  return () => unsubscribe();
}, [])
  const [donnees,setDonnees]= useState([]) // Ici données recevra un tableau par conséquent , on met [] dans en premier lieu dans les paramètres de useState 
  const docRef = collection(db, "clients");// référence à la collection "clients" de la base de données "db"
getDocs(docRef) // ceci est une fonction qui récupère les documents de la collection "clients ", qui elle-même est stockée dans docRef
.then((querySnapshot)=>{ //Ceci est une promesse avec .then qui permet de traiter les résultats une fois qu'ils ont été récupérés par getDocs et querySnapshot contient un snapshot de
                        // nosdonnées  
  const data = querySnapshot.docs.map((doc)=>({
    id: doc.id,
    ...doc.data()
    //Ici la fonction map est utilisée pour faire un tableau avec une propriété id qui est égal à l'id du document 
    // "...doc.data()" veut dire que toutes les propriétés seront incluses dans le tableau qui sera attribué à data
  }))
  setDonnees(data)
  
})
.catch(err => {
  console.log(err.message)
})


const renderItem=({item})=>{ if (currentUser.uid === item.uid)return( 
  // Très important !! , pour afficher les données précisément , j'ai besoin de préciser cette condition pour afficher les données de l'utilisateur connecté !!
<View>
  <View style={styles.affichageInfoPerso}>
  <View style={{alignItems:'center',}}>
    <Image source={{ uri: item.imageprofil }} style={styles.imageprofil} />
  </View>
    <Text style={styles.infoPerso}>{item.name}</Text>  
    <Text style={styles.infoPerso}>{item.firstname}</Text>   
  </View>
   <View style={{alignItems:'center'}}>
  <Text> {item.email}</Text>
    <Text> UID: {item.uid}</Text>
    </View>
 </View>
)}

  return (
    
    <View>
      
      <View><Text style={{fontSize:25}}>Informations:</Text></View>

 {currentUser &&(

  
  <View style={{flex:1}}>
   
  <View style={styles.affichageInformations}>
    
    <FlatList
 data={donnees}
 renderItem={renderItem}
 keyExtractor={item=>item.id.toString()}>
 </FlatList>

 

  </View>
  <View style={{height:200,marginTop:50, alignItems:'center'}}>
    <Pressable onPress={()=> navigation.navigate("ChangerInfos")}>
      <Text style={{color:'rgba(197, 44, 35,1)',fontSize:20}}>Changer infos </Text>
      </Pressable>
      </View>
  </View>
 )}
 
 
    </View>
    
    
  )
}

export default MonCompte

const styles = StyleSheet.create({

  affichageInformations:{
    
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(197, 44, 35,1)',
    marginTop:60,
    marginLeft:20,
    marginRight:20,
    borderRadius:20,
    height:300,
    shadowColor:'black',
shadowOffset:{height:0, width:10},
shadowOpacity:0.5,
shadowRadius:20,

    
    
  },
  affichageInfoPerso:{

flexDirection:'row'
,marginTop:20,
justifyContent:'center'

  },
  infoPerso:{
    fontSize:25,
    textAlign:'center',
    margin:10,
    backgroundColor:'white',
    width:120,
    height:30
  
  },
  infosconnexion :{
fontSize:20
  },
  imageprofil:{
    borderRadius:100,
    width: 80, height: 80,
  }
})