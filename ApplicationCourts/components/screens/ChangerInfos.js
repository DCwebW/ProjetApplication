import { StyleSheet, Text, View, ScrollView,TextInput,Pressable } from 'react-native'
import React, {useEffect,useState}from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import Avatar from '../drawer/ImagePicker'
import { updateDoc, query,where,doc,collection, getDocs} from 'firebase/firestore'
import { getAuth, onAuthStateChanged,deleteUser } from 'firebase/auth';
import { db } from '../../ConfigFirebase'

const auth = getAuth()

const ChangerInfos = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [firstname, setFirstName]=useState('')
  const [name, setName]= useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [])


  // fonction pour mettre à jour les données dans un document précis correspondant à l'utilisateur 
  const updateData= async()=>{
    try{
      
      const Reference= collection(db, 'clients')

      const querySnapshot = await getDocs(query(Reference, where ('uid', '==', currentUser.uid)))
      // Ici on récupère le document spécifique à l'utilisateur connecté 

      if(!querySnapshot.empty){
        const docID = querySnapshot.docs[0].id
        // On récupère l'id du document 
        const NewData={

          firstname : firstname,
          name: name 
        }// Ceci sont les nouvelles données, ou les données mises à jour 
        const specificDocRef = doc(db, 'clients',docID)
      // on fait une référence au document qui sera mis à jour avec son ID
        await updateDoc(specificDocRef,NewData)
        // On fait finalement la mise à jour avec la référence et les nouvelles données 
        console.log('Données mises à jour pour le document spécifique avec l\'ID :', docID)
      }
      else{
        console.error('Document spécifique introuvable pour l\'utilisateur avec l\'ID :', currentUser.uid)
      }
    
    }catch(error){

      console.error('Erreur lors de la mise à jour des données :', error.message);
    }
    

  }

  
  


  return (
    <ScrollView >
     <View ><BoutonRetour/></View> 
     <View style={styles.avatar}><Avatar/></View>

     <View style={styles.changeinfos}>
        <View>
        <Text style={{margin:20}}>Prénom</Text>
        <TextInput placeholder='Changer Prénom' style={{backgroundColor:'white', width: 220,height:30,marginLeft:50}}onChangeText={(text)=>setFirstName(text)}></TextInput>
        </View>
        <Text style={{margin:20}}>Nom</Text>
        <TextInput placeholder='Changer Nom' style={{backgroundColor:'white', width: 220,height:30,marginLeft:50}}onChangeText={(text)=>setName(text)}></TextInput>
     </View>
      <Pressable onPress={()=> updateData()}><View style={styles.boutonvalider} ><Text style={{color:'white'}}>Valider</Text></View></Pressable>
      <Pressable><View style={styles.suppression}><Text style={{color:'white'}}>Supprimer le Compte </Text></View></Pressable>
    </ScrollView>
  )
}

export default ChangerInfos

const styles = StyleSheet.create({

    avatar:{
       marginTop:20 ,
       backgroundColor:'black', 
       height:200
      
    },
    changeinfos:{
        
        backgroundColor:"rgba(197, 44, 35,1)",
        minHeight:200,
        minWidth:200,
        margin:20,
        borderRadius:20
    },
    boutonvalider:{

      backgroundColor:'rgba(197, 44, 35,1)',
      width:100,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10,
      marginTop:30,
      marginLeft:140,
      
    },
    suppression:{
      backgroundColor:'rgba(197, 44, 35,1)',
      width:150,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10,
      marginTop:30,
      marginLeft:120,
    }
})