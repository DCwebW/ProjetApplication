import { View, Text,StyleSheet,SafeAreaView,ScrollView,TextInput,Image,Pressable,} from 'react-native'
import React, { useState }from 'react'
import { createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import { Picker } from '@react-native-picker/picker'
import { GoogleAuthProvider,FacebookAuthProvider,TwitterAuthProvider,linkWithRedirect } from 'firebase/auth'
import { collection,addDoc,setDoc, doc } from 'firebase/firestore'
import { db } from '../../ConfigFirebase'

const auth = getAuth();

 
const Inscription = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name,setName]= useState('')
    const [firstname,setFirstName]=useState('')
    const [cpassword, setCPassword]=useState('')
    const [loading,setLoading]=useState(false)
    
 const Envoi = async()=>{
  try{
    await addDoc(collection(db, "clients"),{
      name:name,
      firstname:firstname,
      email:email
    });
    console.log('Données Envoyées')
  }
  catch(e){
    console.error('Erreur dans envoi',e)
  }}


  const SignUp= async ()=>{
        setLoading(true);
        try{
          const response = await createUserWithEmailAndPassword(auth,email,password)
          
          console.log(response);
          alert('Check your emails !')
          const userUid = response.user.uid
          await setDoc(doc(db, 'clients','client 1'),{
            uid:userUid,
            name:name,
            firstname:firstname,
            email:email
          })
          
        }
        catch(error){
          console.log(error);
          alert('Sign up failed :' +error.message)
        }
        finally{
          setLoading(false)
        }
      }

      
return(
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.viewlogo}>
               <Image style={styles.logo}source={require('../../assets/png/logo-no-background.png')}/> 
              </View>
           <View style={styles.inscription}>
            <View style={styles.informations}>
              <TextInput value={name} 
            style={styles.inputinformations} 
            placeholder='Nom' 
            autoCapitalize='none' 
            onChangeText={(text) => setName(text)}></TextInput>

            <TextInput 
            value={firstname} style={styles.inputinformations} 
            placeholder='Prénom' 
            autoCapitalize='none' 
            onChangeText={(text) => setFirstName(text)}>
            </TextInput>
            </View>

            <View style={styles.informationsconnexion}>
              <TextInput value={email} 
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
            <TextInput secureTextEntry={true} 
            value={cpassword} style={styles.input} 
            placeholder='Confirmez votre Mot de Passe' 
            autoCapitalize='none' 
            onChangeText={(text) =>setCPassword(text)}>
            </TextInput>
            </View>
            
            
            </View>
            <View style={styles.boutonInscription}>
            <Pressable  onPress={
            SignUp} style={{backgroundColor:'rgba(197, 44, 35,1)', alignItems:"center", width:100, alignContent:'center', borderRadius:20,marginTop:10}}><Text style={{color:'white',fontSize:25,fontFamily:'PolicePrincipale'}}>Valider</Text></Pressable>
            <Pressable  onPress={
            Envoi} style={{backgroundColor:'rgba(197, 44, 35,1)', alignItems:"center", width:100, alignContent:'center', borderRadius:20,marginTop:10}}><Text style={{color:'white',fontSize:25,fontFamily:'PolicePrincipale'}}>Envoi</Text></Pressable>
            </View>
            </ScrollView>
            </SafeAreaView>

    
    
  )
}

export default Inscription


const styles = StyleSheet.create({

    container: {
        marginHorizontal: 20,
        flex: 1,
        
        alignItems:'center'

        

    },

    inscription:{
      flex:3,
      backgroundColor:'rgba(197, 44, 35,1)',
      margin:20 ,
      borderRadius:15,
      width:400
    },
    input: {
        padding: 20,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'white',
        minWidth: 300,
        maxHeight:20,
        color:'black',
        margin:10
      },  
    inputinformations: {
        padding: 20,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'white',
        minWidth: 160,
        height:20,
        
        color:'black',
        margin:10
      },  



    
    logo:{
      width:110,
      height:79,
      
    },
    viewlogo:{
      flex:1,
      justifyContent: 'center',
        alignItems: 'center',
        padding:10
    },
    boutonInscription:{
        flex:3,
        alignItems:'center'
    },
    informations:{
      flex:1,
      flexDirection:'row'
    },
    informationsconnexion:{
      flex:3
    }

})