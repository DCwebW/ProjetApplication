import { StyleSheet, View,FlatList,Image, TouchableOpacity,Modal } from 'react-native'
import React, { useEffect ,useState} from 'react'
import {  query,where,collection, getDocs, } from 'firebase/firestore'
import { db } from '../../ConfigFirebase2'
import { onAuthStateChanged,getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import CustomText from '../ThemeContext/CustomText'


const auth = getAuth()


const TerrainsFavoris = () => {
 const navigation = useNavigation()
 const [donneesT, setDonneesT]= useState()
  const [donneesTF,setDonneesTF]=useState([])
const [user,setUser]=useState(null)
const [openVerification , SetopenVerification] = useState(false)

const [selectedTerrain, setSelectedTerrain] = useState(null);
  
  useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      setUser(user);
    })
  
    const loadUserData = async () => {
      try {
        const userId = user ? user.uid : null; // Vérifiez si user existe
        if (userId) {
          const terrainRef = collection(db, 'terrains');
          const terrainSnapshot = await getDocs(terrainRef);
          const terrainData = terrainSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDonneesT(terrainData);
          console.log('Données terrain récoltées');
  
          const terrainsFavorisRef = collection(db, 'terrainsfavoris');
          const terrainsFavQuery = query(terrainsFavorisRef, where('idUtilisateur', '==', userId));
          const terrainsFavorisSnapshot = await getDocs(terrainsFavQuery);
          const terrainsFavorisData = terrainsFavorisSnapshot.docs.map((doc) => doc.data());
          setDonneesTF(terrainsFavorisData);
          console.log('Données terrain favoris récoltées');
        }
      } catch (error) {
        console.error('Erreur dans la récolte de données', error);
      }
    };
  
    loadUserData();
  return () => {
    unsubscribe();
  };
  
  },[user]);

  
  const getTerrainsFavorisData = ()=>{
    const terrainsFavorisData = donneesTF.flatMap((favoris)=>{

      const terrainsData = favoris.terrains.map((terrainId)=>{
        const terrainData = donneesT.find((terrain)=> terrain.id === terrainId)
        return terrainData
      })
      return terrainsData
    })
    return terrainsFavorisData

  }
 function handleVerification(terrain){
  SetopenVerification(true)
  setSelectedTerrain(terrain);
 }
 const closeModal = () => {
SetopenVerification(false);
};

const ChoixTerrain =()=>{

  navigation.navigate('FicheTerrainHome',[{terrainchoisi : selectedTerrain.name,id : selectedTerrain.id}])
  closeModal()

}
  const renderItem = ({ item }) => {
    return (
    <View>
    <TouchableOpacity onPress={()=>handleVerification(item)}>
      <View style={styles.itemContainer}>
        
        <Image source={{ uri: item.images }} style={[styles.image, {width:385}]}
        />
        
        <View style={styles.textContainer}>
          <CustomText style={styles.text}>{item.name}</CustomText>
        </View>
      </View></TouchableOpacity>
      <Modal 
      visible={openVerification}
      transparent={true}
      animationType='slide'
      >
  <View
  style={styles.centeredView}
  >
    <View style={styles.modalView}>
    
       <TouchableOpacity style={{alignItems:'center'}} >
        <View style={{backgroundColor:'rgba( 142, 8, 8 ,1)',width:250, height:50,paddingTop:20,borderRadius:15,marginTop:20}}> 
        <CustomText style={{textAlign:'center', color:'white',}}>Sélection du {selectedTerrain?.name}</CustomText>
         </View>
        </TouchableOpacity>
        <View style={{marginTop:20}}>
      <TouchableOpacity onPress={ChoixTerrain}><CustomText>Confirmer</CustomText></TouchableOpacity> 
     <TouchableOpacity onPress={closeModal}><CustomText>Annuler</CustomText></TouchableOpacity> 
     
    </View>
    </View>
  </View>
      </Modal>
      </View>
    );
  };
  

 
  return (
    <View style={{height:230}}>
      <FlatList
   data={getTerrainsFavorisData()}
   renderItem={renderItem}
   keyExtractor={item=>item.id.toString()}
   horizontal
   ></FlatList>
   
   </View>
   
  )
}

export default TerrainsFavoris

const styles = StyleSheet.create({
  itemContainer: {
    position: 'relative',
    marginRight:10
  },
  image: {
    
    height: 200,
    borderRadius: 10,
    marginBottom:20,
    
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:'rgba(197, 44, 35,0.5)',
    height:60,

    borderTopLeftRadius:12,
    borderTopRightRadius:12,
    justifyContent:'center'
  },
  text: {
    color: 'white',  // Couleur du texte
    fontSize: 16,    // Taille de la police du texte
    fontWeight: 'bold',  // Poids de la police du texte
    
  },

  centeredView:{flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:22},
  
    modalView:{
      margin:20,
      backgroundColor:'white',
      borderRadius:20,
      width:'90%',
      padding:35,
      alignItems:'center',
      shadowColor:'#000',
      shadowOffset:{
        width:0,
        height:2,
      },
      shadowOpacity:0.25,
      shadowRadius:4,
      elevation:5
    }  ,
});
