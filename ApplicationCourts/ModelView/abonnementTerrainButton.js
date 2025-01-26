import React,{useEffect,useState} from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import CustomText from '../components/ThemeContext/CustomText'
import { updateDoc, doc, collection, where,getDocs, query,arrayUnion } from 'firebase/firestore'
import * as Notifications from 'expo-notifications'
import { db } from '../ConfigFirebase2'
import { getAuth, onAuthStateChanged} from 'firebase/auth';

const  AbonnementTerrainButton =  ({Id_terrain}) => {

  const auth = getAuth()

   const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
      return () => unsubscribe();
    }, [])

async function abonnementTerrain (){
  if(!currentUser){
    alert("Veuillez vous connecter pour vous abonner")
  }
  
  try{

    const {status} = await Notifications.getPermissionsAsync()
    if(status !== 'granted'){
      alert("Vous devez autoriser les notifictions pour vous abonner")
      return
    }
    const token = (await Notifications.getExpoPushTokenAsync({projectId: 'd9038241-dbd4-4344-af14-d641b9471a19'})).data

  const specificDocRef = doc(db, 'terrains', Id_terrain)

 if(token){

  await updateDoc(specificDocRef,{

    terrains_abonnements: arrayUnion({
      userId: currentUser.uid,
      token: token 
    })
  })

  alert('Vous êtes maintenant abonné à ce terrain')
    
    
  }

}catch(error){

  console.error('Erreur lors de l\'abonnement au terrain :', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
}
  

 
    }
    
  return (
    <TouchableOpacity onPress={()=> abonnementTerrain()}>
<View style={styles.abonnementBouton}>
<CustomText>
  S'abonner à ce terrain
</CustomText>
</View>
    </TouchableOpacity>
  )
}

export default AbonnementTerrainButton
const styles = StyleSheet.create({
  abonnementBouton:{
    backgroundColor: 'rgba(197, 44, 35,1)',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginTop: 20,
    width: 200,
    alignSelf: 'center',
    borderRadius: 15
  }
})