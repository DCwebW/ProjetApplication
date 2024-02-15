import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { QueryDocumentSnapshot, doc, getDocs } from "firebase/firestore"
import { db, } from '../../ConfigFirebase'
import { collection } from 'firebase/firestore'
import { useState,useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
  


const MonCompte = () => {
const [currentUser, setCurrentUser] = useState(null);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });
  return () => unsubscribe();
}, [])
  const [donnees,setDonnees]= useState([]) 
  const docRef = collection(db, "clients");
getDocs(docRef)
.then((querySnapshot)=>{
  const data = querySnapshot.docs.map((doc)=>({
    id: doc.id,
    ...doc.data()
  }))
  setDonnees(data)
  
})
.catch(err => {
  console.log(err.message)
})


const renderItem=({item})=>{ if (currentUser.uid === item.uid)return(
  <View style={styles.affichageInfoPerso}>
    <Text style={styles.infoPerso}>{item.name}</Text>  
    <Text style={styles.infoPerso}>{item.firstname}</Text>
     
  </View>
)}

  return (
    <View>
      
      <View><Text style={{fontSize:25}}>Informations:</Text></View>

 {currentUser &&(
  <View style={styles.affichageInformations}>
    <FlatList
 data={donnees}
 renderItem={renderItem}
 keyExtractor={item=>item.id.toString()}>
 </FlatList>

 <View>
     <Text style={styles.infosconnexion}>Email: {currentUser.email}</Text>
    <Text>UID: {currentUser.uid}</Text>
</View>
  </View>
 )}
    </View>
    
  )
}

export default MonCompte

const styles = StyleSheet.create({

  affichageInformations:{
    
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(197, 44, 35,1)',
    marginTop:100,
    marginLeft:20,
    marginRight:20,
    borderRadius:20,
    height:200
    
  },
  affichageInfoPerso:{



  },
  infoPerso:{
    fontSize:25,
    textAlign:'center',
    margin:10,
    backgroundColor:'white',
    width:100,
    
    
  },
  infosconnexion :{
fontSize:20
  }
})