import { ActivityIndicator, SafeAreaView, View, StyleSheet, KeyboardAvoidingView,Image,Pressable,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button,TextInput } from 'react-native-paper'
import { signInWithEmailAndPassword, getAuth, } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import CustomText from '../ThemeContext/CustomText'
 
const Login = () => {  

const auth =  getAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [securedPassword, setSecuredPassword]= useState(true)
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
           <View style={{flex:1}}>

           <TextInput
      label="Email"
      value={email}
      placeholder='Entrez votre Email'
      onChangeText={(text)=>setEmail(text)}
      contentStyle={{backgroundColor:'rgba(197, 44, 35,0.1)'}}
      selectionColor='rgba(197, 44, 35,1)'
    />


            

            <TextInput secureTextEntry={securedPassword} 
            label="Mot de Passe"
            right={<TextInput.Icon icon="eye" onPress={()=>setSecuredPassword(!securedPassword)}/>}
            value={password} style={styles.input} 
            placeholder='Entrez votre Mot de Passe' 
            selectionColor='rgba(197, 44, 35,1)'
            contentStyle={{backgroundColor:'rgba(197, 44, 35,0.1)'}}
            onChangeText={(text) => setPassword(text)}>
            </TextInput>
           
   { loading ?( <ActivityIndicator size='large' color='black' />
   
   ): ( 
   
   <>
   <View style={{height:20}}></View>


   < Button  onPress={SignIn} style={{backgroundColor:'rgba(197, 44, 35,1)', alignItems:"center", borderRadius:20 ,marginTop:20}}>
   <CustomText style={{color:'white',fontSize:20}}>Connexion</CustomText>
   
   </Button>



   <Button  onPress={()=>navigation.navigate('Inscription')} style={{backgroundColor:'rgba(197, 44, 35,1)', alignItems:"center", borderRadius:20,marginTop:10}}><CustomText style={{color:'white',fontSize:20}}>S'inscrire</CustomText></Button>
   <Pressable  onPress={()=>navigation.navigate('Reinitialisation Mot de passe')} style={{ alignItems:"center", borderRadius:20 ,marginTop:10}}><CustomText style={{color:'rgba(197, 44, 35,1)', fontSize:20,}}>Mot de passe oublié</CustomText></Pressable>
   <TouchableOpacity onPress={()=> navigation.navigate('Politique de Confidentialité')} style={{alignItems:'center'}}><CustomText style={{ alignItems:"center", borderRadius:20 ,marginTop:10,color:'rgba(197, 44, 35,1)', fontSize:20,}}>Politique de Confidentialité</CustomText></TouchableOpacity>
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