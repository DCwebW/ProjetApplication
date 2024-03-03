import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { QueryDocumentSnapshot, doc, getDocs,collection, QuerySnapshot } from "firebase/firestore"
import { db, } from '../../ConfigFirebase'
import { Marker,Callout } from 'react-native-maps'








const TerrainsEnregistrésMarqueurs = () => {

    const [marqueurs, setMarqueurs] = useState([])

    useEffect(()=>{ 
 const fetchMarqueurs = async()=>{


const docRef= collection(db,'terrains')
getDocs(docRef)
.then((QuerySnapshot)=>{

    const data = QuerySnapshot.docs.map((doc)=>({

        id: doc.id,
        ...doc.data() 
    }))
    setMarqueurs(data)
})

 }
 fetchMarqueurs()
    },[])

    const CustomMarker = () =>{
        return(<View>
            <Image style={{width:50, height:50}} source={require('/xampp/htdocs/Formation/ProjetApplication2/ApplicationCourts/assets/splash.png')} />
        </View>)
        
    }
  return (
    marqueurs.map(marqueur=>(
        <Marker
        key={marqueur.id}
        coordinate={
            {
                latitude:marqueur.latitude,
                longitude:marqueur.longitude,
            }
        }
        
        >
       
       <Callout>
        <Text>{marqueur.name}</Text>
       </Callout>
        </Marker>
    ))
  )
}

export default TerrainsEnregistrésMarqueurs

const styles = StyleSheet.create({})