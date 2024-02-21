import { View, Text,StyleSheet,Pressable,TextInput,Alert,ScrollView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../ConfigFirebase'
import { getAuth,sendPasswordResetEmail,onAuthStateChanged, } from 'firebase/auth'
import { useState,useEffect } from 'react'

const MotdepasseOublie = () => {

  const auth = FIREBASE_AUTH || getAuth()

  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('')
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });
  return () => unsubscribe();
}, [])
  const changeMotdePasse = async()=>{
 try {

  if (!/^\S+@\S+\.\S+$/.test(email)) { // expression régulière pour savoir si l'email est au bon format 
    Alert.alert('Adresse e-mail non valide', 'Veuillez saisir une adresse e-mail valide.');
    return;
  } 
   await sendPasswordResetEmail(auth,email)
   alert("Email de réinitialisation de mot passe envoyé")
  }
catch(error){
      alert(error)
    }
  }
  

  return (
    <ScrollView style={{flex:1}}>
    <View style={{flex:1,height:200,marginTop:20}}>
       <Text style={styles.titre}>Envoi de mail de réinitialisation</Text>
       </View>
    <View style={styles.Parametres}>
      
     
      <Text style={{color:'white',fontSize:25}}>Adresse mail : </Text>
      <TextInput placeholder='Ecrivez adresse mail' onChangeText={(text)=>setEmail(text)} style={styles.inputmail}>{email}</TextInput>
      
      
    </View>
    <View style={{alignItems:'center'}}>
      <Pressable onPress={()=>{changeMotdePasse()}} style={styles.boutonenvoimail}><Text style={{color:'white'}}>Envoyer </Text></Pressable>
    </View>
    </ScrollView>
  )
}

export default MotdepasseOublie

const styles = StyleSheet.create({

    Parametres:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(197, 44, 35,1)',
        margin:20,
        height:200,
        borderRadius:20
        
    },
    titre:{
      color:'rgba(197, 44, 35,1)',
      fontSize:25,
      textAlign:'center'
    },

    boutonenvoimail:{
      backgroundColor:'rgba(197, 44, 35,1)',
        width:100,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginTop:30,
        marginLeft:10
    },

    inputmail:{
      backgroundColor:'white',
      height:50,
      minWidth:300,
      borderColor:'black',
      borderWidth:2
    }

})