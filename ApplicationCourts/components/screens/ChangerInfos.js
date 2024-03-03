import { StyleSheet, Text, View, ScrollView,TextInput,Pressable,Modal,TouchableOpacity, } from 'react-native'
import React, {useEffect,useState}from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import Avatar from '../drawer/ImagePicker'
import { updateDoc, query,where,doc,collection, getDocs,deleteDoc} from 'firebase/firestore'
import { getAuth, onAuthStateChanged,deleteUser, reauthenticateWithCredential, AuthCredential,EmailAuthProvider } from 'firebase/auth';
import { db } from '../../ConfigFirebase'
import { useNavigation,CommonActions } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../ConfigFirebase'



const auth = getAuth()

const ChangerInfos = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [firstname, setFirstName]=useState('')
  const [name, setName]= useState('')
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete]= useState(false)
  const [password,setPassword]= useState('') 
  const navigation = useNavigation()


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [])
// Ceci est utilisé pour définir currentUser en tant que utilisateur authentifié , pour ensuite agir dessus avec nos fonctions 

  // fonction pour mettre à jour les données dans un document précis correspondant à l'utilisateur 
  const updateData= async()=>{
    try{
      
      const Reference= collection(db, 'clients')
      // Référence à la base de données , et la collection clients

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

  const verifyPassword = async () => {
    
    try {

      if (!currentUser) {
        console.error('currentUser is null or undefined.');
        return;
      } 
      const Reference= collection(db, 'clients')
      
      // Réauthentifier l'utilisateur avant de supprimer le compte
      const credential = EmailAuthProvider.credential(currentUser.email, password);
      
      await reauthenticateWithCredential(auth.currentUser, credential);
  
      // Si la réauthentification réussit, procédez à la suppression du compte

      const querySnapshot = await getDocs(query(Reference, where ('uid', '==', currentUser.uid)))
      if(!querySnapshot.empty){
        const docID = querySnapshot.docs[0].id
        try {
          await deleteDoc(doc('clients', docID));
        } catch (error) {
          console.error('Erreur lors de la suppression du document :', error.message);   //
        }
      }else {
        console.error('Document spécifique introuvable pour l\'utilisateur avec l\'ID :', currentUser.uid);
      }
//  La fonction ci dessus permet de supprimer l'utilisateur de la base de données , comme pour la mise à jour plus haut j'ai du utiliser
//  Une requete avec where pour bien spécifier le document que je veux supprimer 


      await deleteUser(currentUser);

      
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }] // Assurez-vous d'ajuster le nom de votre écran de connexion
        }) // Cette fonction réinitialise la pile de navigation , l'index ici avec 0 , indique que la pile sera réduite à une page 
      )
      
      console.log('Compte supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la vérification du mot de passe ou de la suppression du compte :', error.message);
    } finally {
      // Ferme le modal après l'opération (réussie ou non)
      setOpenDelete(false);
    }
  };
  
  function handleOnPress(){
    setOpen(!open)
  }
  function handleOpenDelete(){

    setOpenDelete(!openDelete)
    setOpen(false)
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
      <Pressable onPress={handleOnPress}><View style={styles.suppression}><Text style={{color:'white'}}>Supprimer le Compte </Text></View></Pressable>

      <Modal 
      animationType='slide'
      transparent={true}
      visible={open}
      
      >
<View style={styles.centeredView}>
<View style={styles.modalView}>
<Text> Etes-vous sur de vouloir supprimer votre compte ?</Text>
<View style={{flexDirection:'row',marginTop:40}}>
<TouchableOpacity onPress={handleOnPress}><Text style={{fontSize:20,marginRight:40}}>Annuler</Text></TouchableOpacity>
<TouchableOpacity onPress={handleOpenDelete}><Text style={{color:'red', fontSize:20}}>Supprimer</Text></TouchableOpacity>
</View>
</View>
</View>   
      </Modal>

      <Modal
  visible={openDelete}
  animationType='slide'
  transparent={true}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text>Afin de procéder à la suppression du compte, nous devons vérifier votre mot de passe :</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        placeholder='Entrez votre mot de passe'
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => verifyPassword()}>
        <Text style={{ color: 'red', fontSize: 20 }}>Vérifier et Supprimer</Text>
      </TouchableOpacity>
      <TouchableOpacity
       onPress={handleOpenDelete}><Text>Annuler</Text></TouchableOpacity>
    </View>
  </View>
</Modal>

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
    },
    centeredView:{flex:1,
      justifyContent:'center',
      alignItems:'center',
      marginTop:22},
    
      modalView:{
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        width:'90%',
        padding:35,
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
          width:0,
          height:2,
        },
        shadowOpacity:0.5,
        shadowRadius:4,
        elevation:5
      },
      input: {
        margin:20,
       borderWidth:2,
       borderColor:'black',
       minWidth:150,
       minHeight:40



    },
})