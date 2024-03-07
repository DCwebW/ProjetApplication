import { View, Text ,Image,FlatList,useWindowDimensions} from 'react-native'
import React from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import { QueryDocumentSnapshot, doc, getDocs,collection, QuerySnapshot } from "firebase/firestore"
import { db, } from '../../ConfigFirebase'
import { useState, useEffect} from 'react'
import { err } from 'react-native-svg'
const FicheTerrain = ({route}) => {

  const [terrain,setTerrain]=useState()
  const { name , image} = route.params;
  const nomTerrain = JSON.stringify(name)

  const {width} = useWindowDimensions()

  useEffect(()=>{
const docRef=collection(db,'terrains')
getDocs(docRef)
.then((QuerySnapshot)=>{

  const data = QuerySnapshot.docs.map((doc)=>({

    id: doc.id,
    ...doc.data()
  }))

  setTerrain(data)
  
})
.catch(error=> {console.log('Erreur dans la récolte de données', error)})



  },[])

  const renderItem =({item})=>{

    if(name === item.name) return(
      <View>
      <View>

       <BoutonRetour/> 
      </View>
      <View style={{marginTop:20}}>
        
        <Image source={{uri: item.images[0]}} style={{width,height:300,marginTop:20}} />
       <View>
        
        <Text>Nom : {item.name}</Text>
        <Text>Type de filet : {item.typefilet}</Text>
        <Text>{item.adresse}</Text>
        </View> 
      </View></View>
    )

  }


  return (
    <View>
      
     <FlatList
     data={terrain}
     renderItem={renderItem}
     keyExtractor={item=>item.id.toString()}
     >

     </FlatList>
    </View>
  )
}

export default FicheTerrain