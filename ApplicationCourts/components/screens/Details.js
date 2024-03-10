import { View, Text, TouchableOpacity,StyleSheet,Image,FlatList} from 'react-native'
import React,{useEffect,useState} from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import { SvgUri } from 'react-native-svg'
import { db } from '../../ConfigFirebase'
import { updateDoc, query,where,doc,collection, getDocs,deleteDoc} from 'firebase/firestore'

const Details = () => {
 const [donnees,setDonnees] = useState([])
 const [display,setDisplay] = useState(false)

const docRef = collection(db, "terrainsfavoris")
getDocs(docRef)
.then((querySnapshot)=>{

  const data = querySnapshot.docs.map((doc)=>({
 id: doc.id,
 ...doc.data()
 
  }))

  setDonnees(data)
})
.catch(err=>{
  console.log(err.message)
})


const renderItem=({item}) => {

  if(display=== true) return (

    <View>
      <View><Text>{item.Utilisateur}</Text></View>
      <View><Text>{item.Terrain}</Text></View>
    </View>
  )
}
  return (
    <View style={{justifyContent:'center', alignItems:'center',flex:1}}>
    
    <TouchableOpacity onPress={()=>setDisplay(!display)}>
      <View >
        <Text style={{backgroundColor:'orange', height:35}}>Test base de données , collection: terrains favoris</Text></View>
    </TouchableOpacity>
      
      <FlatList
      data={donnees}
      renderItem={renderItem}
      keyExtractor={item=>item.id.toString()}
      >

      </FlatList>
      
    </View>
  )
}

export default Details


