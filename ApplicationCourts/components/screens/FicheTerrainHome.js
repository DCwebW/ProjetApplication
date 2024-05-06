import { View, Text ,Image,FlatList,useWindowDimensions, TouchableOpacity,StyleSheet} from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import BoutonRetour from '../navigation/BoutonRetour'
import { QueryDocumentSnapshot, doc, getDocs,collection, QuerySnapshot, addDoc, updateDoc,where, query } from "firebase/firestore"
import { db } from '../../ConfigFirebase2'
import React, { useState, useEffect} from 'react'
import { onAuthStateChanged,getAuth } from 'firebase/auth'



const auth = getAuth();

const FicheTerrainHome = ({route}) => {


    const [terrain,setTerrain]=useState()
  const [buttonpressed, setButtonPressed]=useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [user,setUser]= useState(null)
  const [terrainpresent,setTerrainPresent] = useState()
  

    const {terrainchoisi,id} = route.params[0]
    const {width} = useWindowDimensions()

    const handleButtonPress = () => {
      setButtonPressed(!buttonpressed);
  
      if (buttonpressed) {
        removeFavori(); // Si le bouton est déjà pressé, supprime le favori
      } else {
        ajoutFavori(); // Sinon, ajoute le favori
      }
    };
    useEffect(()=>{
  
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('user', user);
        setUser(user);
      });
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
  
  return () => {
    unsubscribe();
  };
  
    },[id])
    useEffect(() => {
      const checkTerrainPresent = async () => {
        const TerrainPresentQuery = query(collection(db, 'terrainsfavoris'), where('terrains', 'array-contains', id));
        // Ici array-contains est utilisé pour savoir si l'id du terrain est contenu dans le champ terrains de la base de données
        // Car le champ terrain est un tableau et est géré differemment 
        const snapshotTerrainPresent = await getDocs(TerrainPresentQuery);
        const isTerrainPresent = !snapshotTerrainPresent.empty;
        // cette constant renvoie un booléen
        setTerrainPresent(isTerrainPresent);
        setButtonPressed(isTerrainPresent);
        setShowMessage(isTerrainPresent)
      };
  
      checkTerrainPresent();
    }, []);
  
  
    const ajoutFavori = async () => {
      const userId = user.uid;
      const terrainsfavorisRef = collection(db, "terrainsfavoris");
      const terrainsQuery = query(terrainsfavorisRef, where('idUtilisateur', '==', userId));
    
      try {
        const snapshot = await getDocs(terrainsQuery);
    
        if (snapshot.empty) {
          const nouveauTerrainFavori = {
            idUtilisateur: userId,
            terrains:[id] ,
          };
          await addDoc(terrainsfavorisRef, nouveauTerrainFavori); // Utiliser terrainsfavorisRef ici
          console.log('Terrain mis en favori');
        } else {
          const docId = snapshot.docs[0].id;
          const terrainsfavorisData = snapshot.docs[0].data();
    
          const updatedTerrains = [...(terrainsfavorisData.terrains || []), id];
         // Ici un tableau est formé avec le champ terrains du document sur la base de données grace à '...'
         // Si le champ est vide , il renvoie logique un tableau vide []
          const newterrainsFavorisData = {
            terrains: updatedTerrains,
          }
          const Reference = doc(db, 'terrainsfavoris', docId);
          await updateDoc(Reference, newterrainsFavorisData);
          
          console.log('Terrain mis en favori');
        }
    
        // Mettre à jour l'état pour afficher le message
        setShowMessage(true);
      } catch (error) {
        console.log('Echec : Terrain non ajouté', error);
      }
    };
  
    const removeFavori = async () => {
      const userId = user.uid;
      const terrainsfavorisRef = collection(db, "terrainsfavoris");
      const terrainsQuery = query(terrainsfavorisRef, where('idUtilisateur', '==', userId));
  
      try {
        const snapshot = await getDocs(terrainsQuery);
  
        if (!snapshot.empty) {
          const docId = snapshot.docs[0].id;
          const terrainsfavorisData = snapshot.docs[0].data();
  
          const updatedTerrains = (terrainsfavorisData.terrains || []).filter(t => t !== id);
           // Ici la méthode filter crée un tableau et la methode renverra true pour tous les éléments n'étant pas égal à l'id
          const newterrainsFavorisData = {
            terrains: updatedTerrains,
          };
  
          const Reference = doc(db, 'terrainsfavoris', docId);
          await updateDoc(Reference, newterrainsFavorisData);
          console.log('Terrain retiré des favoris');
        }
  
        // Mettre à jour l'état pour afficher le message
        setShowMessage(true);
      } catch (error) {
        console.log('Échec : Terrain non retiré des favoris', error);
      }
    };
  
    
    
  
   
  
    const renderItem =  ({item})=>{ 
  
      if(terrainchoisi === item.name) return(
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
          <Text> {id}</Text>
          
          </View>
  
          <View style={{flex:1,alignItems:'flex-end'}}>
  
       
        <TouchableOpacity
        
        onPress={handleButtonPress}>
  
         
          {  buttonpressed ? 
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


export default FicheTerrainHome

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
})