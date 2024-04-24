import { ActivityIndicator, SafeAreaView, View, Text, StyleSheet, TextInput, KeyboardAvoidingView,Image,Pressable } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../ConfigFirebase'
import { signInWithEmailAndPassword, getAuth, } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { signInWithCustomToken } from 'firebase/auth'




const auth = FIREBASE_AUTH || getAuth()
 
const Login = () => {  

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
     
    const SignIn= async()=>{
      setLoading(true);
      try{
        const response = await signInWithEmailAndPassword(auth,email,password);
        
        
        console.log(response.user.getIdToken());
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
   <Pressable   onPress={SignIn} style={{backgroundColor:'rgba(197, 44, 35,1)', alignItems:"center", borderRadius:20 ,marginTop:20}}><Text style={{color:'white',fontSize:25}}>Connexion</Text></Pressable>
   <Pressable  onPress={()=>navigation.navigate('Inscription')} style={{backgroundColor:'rgba(197, 44, 35,1)', alignItems:"center", borderRadius:20,marginTop:10}}><Text style={{color:'white',fontSize:25}}>S'inscrire</Text></Pressable>
   <Pressable  onPress={()=>navigation.navigate('Reinitialisation Mot de passe')} style={{ alignItems:"center", borderRadius:20 ,marginTop:10}}><Text style={{color:'rgba(197, 44, 35,1)', fontSize:20,}}>Mot de passe oublié</Text></Pressable>
   
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
        
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        
        minWidth: 300,
        minHeight:40,
        
        



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