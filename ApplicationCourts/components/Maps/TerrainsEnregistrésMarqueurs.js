import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { QueryDocumentSnapshot, doc, getDocs,collection, QuerySnapshot } from "firebase/firestore"
import { db, } from '../../ConfigFirebase'
import { Marker,Callout } from 'react-native-maps'
import { SvgUri,SvgXml } from 'react-native-svg'








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

    const CustomMarker = () => {
        
      
        return <View>
            <Image style={{width:30,height:30}}source={require('../../assets/png/icons8-basketball-48.png')}/>
    
        </View>
        ;
        //Icone issu du site https://icones8.fr
      };
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
       <CustomMarker/>
       <Callout style={{width:100,height:80}}>
        <Text>{marqueur.name}</Text>
        <Image source={{uri : marqueur.images[0]}} style={{width:50,height:50}}/>
       </Callout>
        </Marker>
    ))
  )
}

export default TerrainsEnregistrésMarqueurs

const styles = StyleSheet.create({})