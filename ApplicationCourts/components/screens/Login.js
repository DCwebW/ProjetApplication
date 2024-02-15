import { ActivityIndicator, SafeAreaView, View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView,Image,Pressable } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { FIREBASE_AUTH } from '../../ConfigFirebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth,GoogleAuthProvider,signInWithCredential,signInWithPopup, browserSessionPersistence} from 'firebase/auth'
import { useFonts } from 'expo-font'
import {Kanit_100Thin} from '@expo-google-fonts/kanit'
import MotdepasseOublie from './MotdepasseOublie'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { setPersistence } from 'firebase/auth'
const auth = FIREBASE_AUTH || getAuth()
 



const Login = ({navigation}) => {
  const [fontsLoaded] = useFonts({
    'PolicePrincipale': Kanit_100Thin
  });

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    

   

    

    const SignIn= async()=>{
      setLoading(true);
      try{
        const response = await signInWithEmailAndPassword(auth,email,password);
        console.log(response);
        alert('Check your emails !')
      } 
      catch (error){
        console.log(error)
        alert('Sign in  failed'+ error.message)
      } 
      finally{
        setLoading(false)
      }
    }
    const provider = new GoogleAuthProvider()
    const SignInwithprovider=async ()=>{
      
      setLoading(true);
      try{
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
    
        // Utilisez les informations d'identification pour vous connecter
        
       }
      catch(error){
        console.log(error);
        alert('Sign in failed :' +error.message)
      }
      finally{
        setLoading(false)
      }
    }

    
    return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior='padding'>
            <View style={styles.viewlogo}>
               <Image style={styles.logo}source={require('../../assets/png/logo-no-background.png')}/> 
              </View>
           <View style={{flex:1}}><TextInput value={email} 
            style={styles.input} 
            placeholder='Entrez votre Email' 
            autoCapitalize='none' 
            onChangeText={(text) => setEmail(text)}></TextInput>

            <TextInput secureTextEntry={true} 
            value={password} style={styles.input} 
            placeholder='Entrez votre Mot de Passe' 
            autoCapitalize='none' 
            onChangeText={(text) => setPassword(text)}>
            </TextInput>
           
   { loading ?( <ActivityIndicator size='large' color='black' />
   
   ): ( 
   
   <>
   <View style={{height:20}}></View>
   <Pressable   onPress={SignIn} style={{backgroundColor:'rgba(197, 44, 35,1)', alignItems:"center", borderRadius:"20" ,marginTop:20}}><Text style={{color:'white',fontSize:25,fontFamily:'PolicePrincipale'}}>Connexion</Text></Pressable>
   <Pressable  onPress={()=>navigation.navigate('Inscription')} style={{backgroundColor:'rgba(197, 44, 35,1)', alignItems:"center", borderRadius:"20",marginTop:10}}><Text style={{color:'white',fontSize:25,fontFamily:'PolicePrincipale'}}>S'inscrire</Text></Pressable>
   <Pressable  onPress={()=>navigation.navigate('Motdepasse',{userId:'X001'} )} style={{ alignItems:"center", borderRadius:"20" ,marginTop:10}}><Text style={{color:'rgba(197, 44, 35,1)', fontSize:20, fontFamily:"PolicePrincipale"}}>Mot de passe oublié</Text></Pressable>
   <Pressable  onPress={SignInwithprovider} style={{ alignItems:"center", borderRadius:"20" ,marginTop:10}}><Text style={{color:'rgba(197, 44, 35,1)', fontSize:20, fontFamily:"PolicePrincipale"}}>Se connecter avec Google</Text></Pressable>
          </> )} 
            </View> 
            </KeyboardAvoidingView>
            </SafeAreaView>
    )
}

export default Login


const styles = StyleSheet.create({

    container: {
        marginHorizontal: 20,
        flex: 1,
        
        alignItems:'center'

        

    },
    input: {
        padding: 20,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'white',
        minWidth: 300,
        maxHeight:20,
        color:'black'
        



    },
    logo:{
      width:180,
      height:130,
      
    },
    viewlogo:{
      flex:1,
      justifyContent: 'center',
        alignItems: 'center',
        padding:10
    }
})