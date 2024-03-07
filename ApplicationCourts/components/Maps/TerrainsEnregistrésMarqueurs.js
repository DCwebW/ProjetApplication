import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { QueryDocumentSnapshot, doc, getDocs,collection, QuerySnapshot } from "firebase/firestore"
import { db, } from '../../ConfigFirebase'
import { Marker,Callout } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'









const TerrainsEnregistrésMarqueurs = () => {

    const [marqueurs, setMarqueurs] = useState([])
const navigation = useNavigation()
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
        
      
        return <View style={{backgroundColor:'rgba(197, 44, 35,1)',borderRadius:40,width:35,height:35,alignItems:'center',justifyContent:'center'}}>
            <Image style={{width:30,height:30,}}source={require('../../assets/png/icons8-basketball-48.png')}/>
    
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
       <Callout style={{width:300,height:200}}>
        <Text style={{fontSize:20}}>{marqueur.name} :</Text>
        <Image source={{uri : marqueur.images[0]}} style={{width:200,height:100,marginLeft:20,marginTop:20}}/>
        <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={()=> navigation.navigate('Fiche',{
                
                name : marqueur.name,
                image : marqueur.images
             })}>
            <View style={{backgroundColor:'rgba(197, 44, 35,1)',width:150, marginTop:20, alignItems:'center',height:35,justifyContent:'center',borderRadius:10}}><Text style={{color:'white'}}>Voir fiche du terrain </Text></View>
        </TouchableOpacity></View>
        
       </Callout>
        </Marker>
    ))
  )
}

export default TerrainsEnregistrésMarqueurs

const styles = StyleSheet.create({})