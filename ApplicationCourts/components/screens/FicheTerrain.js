import { View, Text ,Image,FlatList,useWindowDimensions, TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'
import { AntDesign,Entypo } from '@expo/vector-icons'
import BoutonRetour from '../navigation/BoutonRetour'
import { QueryDocumentSnapshot, doc, getDocs,collection, QuerySnapshot } from "firebase/firestore"
import { db, } from '../../ConfigFirebase'
import { useState, useEffect} from 'react'
import { err } from 'react-native-svg'
const FicheTerrain = ({route}) => {

  const [terrain,setTerrain]=useState()
  const [buttonpressed, setButtonPressed]=useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const { name , image} = route.params;
  const nomTerrain = JSON.stringify(name)

  const {width} = useWindowDimensions()

  const handleButtonPress = () => {
    setButtonPressed(!buttonpressed);
    setShowMessage(!showMessage);
  };
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
      <Text style={{textAlign:'center', fontSize:25,color:'rgba(197, 44, 35,1)'}}> {item.name}</Text>  
      </View>
      <View style={{marginTop:20,}}>
        
        <Image source={{uri: item.images}} style={{width,height:300,marginTop:10}} />

        <View style={{flexDirection:'row', flex:1}}>
       <View style={{flex:1}}>
        
        <Text>{item.adresse}</Text>
        <Text>Type de filet : {item.typefilet}</Text>
        
        </View>

        <View style={{flex:1,alignItems:'flex-end'}}>

     
      <TouchableOpacity
      
      onPress={handleButtonPress}>
        { buttonpressed ? 
        <AntDesign name='heart' color={'rgba(197, 44, 35,1)'} size={50}/>
        
        :
         <AntDesign name='hearto' size={50}/> 
      }
      </TouchableOpacity>
      
     </View>
     
        </View>
{showMessage && (
        <View style={styles.messageContainer}>
          <Text>Mis en favori</Text>
        </View>
      )}
      </View></View>
    )

  }


  return (
    <View >
      
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    marginBottom:60,
    zIndex:1,
    height:40,
    marginTop:260,
    marginLeft:300
    
  },
});