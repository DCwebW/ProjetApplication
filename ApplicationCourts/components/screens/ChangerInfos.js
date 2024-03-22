import { StyleSheet, Text, View, ScrollView,TextInput,Pressable,Modal,TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import Avatar from '../drawer/ImagePicker'
import { updateDoc, query,where,doc,collection, getDocs,deleteDoc} from 'firebase/firestore'
import { getAuth, onAuthStateChanged,deleteUser, reauthenticateWithCredential,EmailAuthProvider } from 'firebase/auth';
import { db,storage } from '../../ConfigFirebase'
import { useNavigation,CommonActions } from '@react-navigation/native'
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";



const auth = getAuth()

const ChangerInfos = ({route}) => {

  const {nom , prénom}= route.params
  const [currentUser, setCurrentUser] = useState(null);
  const [firstname, setFirstName]=useState('') // valeur initiale vide pour firstname , ignorer erreur SonarLint 
  const [name, setName]= useState('')
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete]= useState(false)
  const [password,setPassword]= useState('') 
  const navigation = useNavigation()
  const [imageprofil , setImageProfil]= useState(null)

  
ChangerInfos.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      nom: PropTypes.string.isRequired,
      prénom: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  }).isRequired,
}; // Ici ce code valide les props , il vérifie si ils ont bien le type et la forme voulus,il améliore aussi les performances 

  const nomProfil = JSON.stringify(nom)
  const prénomProfil = JSON.stringify(prénom)

 const handleImageProfil=(nouvelleImage)=>{
  setImageProfil(nouvelleImage)
 }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [])
// Ceci est utilisé pour définir currentUser en tant que utilisateur authentifié , pour ensuite agir dessus avec nos fonctions 

  // fonction pour mettre à jour les données dans un document précis correspondant à l'utilisateur 


  

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

const uploadImageAsync = async (uri) => {
    try {
      const blob = await createBlobFromUri(uri);
      const storageRef = ref(storage, `images/image-${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      blob.close();
      return downloadURL;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  };

  const uploadImageAndUpdateData = async (imageprofil) => {
    try {
      if (imageprofil) {
        const downloadURL = await uploadImageAsync(imageprofil);
        return { imageprofil: downloadURL };
      }
      return {};
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image :', error.message);
      return {};
    }
  };
  
  const updateData = async () => {
    if (currentUser) {
      try {
        if (!firstname && !name && !imageprofil) {
          console.log('Aucune nouvelle information fournie.');
          return;
        }
  
        const newData = await uploadImageAndUpdateData(imageprofil);
  
        const Reference = collection(db, 'clients');
        const querySnapshot = await getDocs(query(Reference, where('uid', '==', currentUser.uid)));
  
        if (!querySnapshot.empty) {
          const docID = querySnapshot.docs[0].id;
          const specificDocRef = doc(db, 'clients', docID);
  
          if (firstname !== undefined && firstname !== '') {
            newData.firstname = firstname;
          }
          if (name !== undefined && name !== '') {
            newData.name = name;
          }
  
          await updateDoc(specificDocRef, newData);
          console.log('Données mises à jour pour le document spécifique avec l\'ID :', docID);
        } else {
          console.error('Document spécifique introuvable pour l\'utilisateur avec l\'ID :', currentUser.uid);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour des données :', error.message);
      }
    } else {
      console.error('Utilisateur non défini');
    }
  };
   

  const verifyPassword = async () => {


    if (currentUser){
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
      setOpen(false)
      setOpenDelete(false)
      
      console.log('Compte supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la vérification du mot de passe ou de la suppression du compte :', error.message);
    } finally {
      // Ferme le modal après l'opération (réussie ou non)
      setOpenDelete(false);
    }


    } else {

      console.error('Utilisateur non défini')
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

     <View style={styles.avatar}><Avatar results={handleImageProfil}/></View>

     <View style={styles.changeinfos}>
        <View>
        <Text style={{margin:20}}>Prénom : {prénomProfil}</Text>
        <TextInput placeholder='Changer Prénom' style={{backgroundColor:'white', width: 220,height:30,marginLeft:50}}onChangeText={(text)=>setFirstName(text)}></TextInput>
        </View>
        <Text style={{margin:20}}>Nom :{nomProfil}</Text>
        <TextInput placeholder='Changer Nom' style={{backgroundColor:'white', width: 220,height:30,marginLeft:50}}onChangeText={(text)=>setName(text)}></TextInput>
     </View>
      <Pressable onPress={()=> updateData()} testID="validerButton"><View style={styles.boutonvalider} ><Text style={{color:'white'}}>Valider</Text></View></Pressable>
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