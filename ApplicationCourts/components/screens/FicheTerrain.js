import { View, Text } from 'react-native'
import React from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import { QueryDocumentSnapshot, doc, getDocs,collection, QuerySnapshot } from "firebase/firestore"
import { db, } from '../../ConfigFirebase'
import { useState, useEffect} from 'react'
const FicheTerrain = ({route}) => {

  const [terrain,setTerrain]=useState()
  const { name } = route.params;
  const nomTerrain = JSON.stringify(name)

const docRef=collection(db,'terrains')
  return (
    <View>
      <View>
      <BoutonRetour/>  
      </View>
    
    <View>
     <Text>Nom : {nomTerrain}</Text> 
    </View>
      
    </View>
  )
}

export default FicheTerrain