import { View, Text,StyleSheet,SafeAreaView,ScrollView,TextInput,Image,Pressable,Alert} from 'react-native'
import React, { useState }from 'react'
import { createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import { Picker } from '@react-native-picker/picker'
import { GoogleAuthProvider,FacebookAuthProvider,TwitterAuthProvider,linkWithRedirect, } from 'firebase/auth'
import { collection,addDoc,setDoc, doc, DocumentReference, } from 'firebase/firestore'
import { db } from '../../ConfigFirebase'

const auth = getAuth();

 
const Inscription = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name,setName]= useState('')
    const [firstname,setFirstName]=useState('')
    const [cpassword, setCPassword]=useState('')
    const [loading,setLoading]=useState(false)
    



  const SignUp= async ()=>{
        setLoading(true);
        if( password === cpassword){try{
          const response = await createUserWithEmailAndPassword(auth,email,password)
          
          console.log(response);
          alert('Check your emails !')
          const userUid = response.user.uid
          await setDoc(doc(db, 'clients',userUid),{
            uid:userUid,
            name:name,
            firstname:firstname,
            email:email
          })
          console.log("Document written with ID: ", userUid)
          
        }
        catch(error){
          console.log(error);
          alert('Sign up failed :' +error.message)
        }
        finally{
          setLoading(false)
        }
      }
    
    else{
      Alert.alert("Le mot de passe n'est pas confirmé")
    }}
        

      
return(
        
          <ScrollView>
            <View style={styles.viewlogo}>
               <Image style={styles.logo}source={require('../../assets/png/logo-no-background.png')}/> 
              </View>
           <View style={styles.inscription}>
            <View style={styles.informations}>

          <TextInput 
          placeholder='Nom' 
          style={styles.inputinformations}
          onChangeText={(text)=>setName(text)}></TextInput>    
          <TextInput 
          placeholder='Prénom' 
          style={styles.inputinformations}
          onChangeText={(text)=>setFirstName(text)}></TextInput>    

            
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
            SignUp} style={styles.boutonvalider}><Text style={{color:'white',fontFamily:'PolicePrincipale'}}>Valider</Text></Pressable>
           
            </View>
            </ScrollView>
            

    
    
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
     alignSelf:'center',
      borderRadius:15,
      width:400,
      marginTop:10
    },
    input: {
        
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'white',
        minWidth: 300,
        minHeight:40,
        color:'black',
        margin:10
      },  
    inputinformations: {
        
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: 'white',
      minWidth: 160,
      minHeight:40,
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
    },
    boutonvalider:{backgroundColor:'rgba(197, 44, 35,1)',
    width:100,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    marginTop:10,
    marginLeft:10}

})