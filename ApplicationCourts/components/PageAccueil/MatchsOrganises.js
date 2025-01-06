import { FlatList, StyleSheet,TouchableOpacity, View,Image } from 'react-native'
import React,{ useEffect ,useState} from 'react'
import { query,where,collection, getDocs} from 'firebase/firestore'
import { db } from '../../ConfigFirebase2'
import { onAuthStateChanged,getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import CustomText from '../ThemeContext/CustomText'

const auth = getAuth()
const MatchsOrganises = () => {
    const [user,SetUser]=useState(null)
    const [matchs,SetMatchs]=useState([])
const navigation = useNavigation()

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            SetUser(user)
        })

        const loadUserData= async()=>{

        try{

            const userId = user ? user.uid : null
            if (userId){
                const matchsRef = collection (db, 'matchs')
                
                const matchsQuery= query(matchsRef, where('useruid','==',userId))

                const matchsSnapshot = await getDocs(matchsQuery)
                const matchsData = matchsSnapshot.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                
                }))
                SetMatchs(matchsData)
              console.log('Données matchs récoltés')
            }
        }catch(error){
            console.log('Données des matchs non récoltés',error)
        }
        }
    loadUserData()
        return ()=>{
            unsubscribe()
        }

    }, [user])

    const renderItem=({item})=>{
 return (

    <View style={styles.matchsView}>
        <TouchableOpacity onPress={()=> navigation.navigate('FicheMatch',{matchid: item.id})}>
            <View>
                <View style={styles.imagematchView}>
                <Image source={require('../../assets/png/depositphotos_331770894-stock-photo-professional-basketball-court-arena-background.jpg')} style={styles.imagematch}
                
                />     
                </View>
               <View style={styles.informationsmatch} >
                <CustomText style={styles.informationsmatchtext}>{item.date}</CustomText>
                <CustomText style={styles.informationsmatchtext}>{item.heure}</CustomText>
                <CustomText style={styles.informationsmatchtext}>{item.terrain}</CustomText>
                </View>
            </View>
        </TouchableOpacity>
    </View>
 )

    }
  return (
   <FlatList
   data={matchs}
   renderItem={renderItem}
   keyExtractor={item=>item.id.toString()}
   horizontal
   ></FlatList>
  )
}

export default MatchsOrganises

const styles = StyleSheet.create({

    matchsView:{
        height:200,
        borderRadius:10,
        marginRight:10
      
    },
    imagematchView:{
        position:'absolute',
        borderRadius:10
        
    },
    imagematch:{
        height:200,
        width: 390,
        borderRadius:10
    },
    informationsmatch:{
        backgroundColor:'rgba(197, 44, 35,0.5)',
        width:390,
       borderTopLeftRadius:10,
       borderTopRightRadius:10,
        height:65,
        justifyContent:'center'
    },
    informationsmatchtext:{
        color:'white',
        marginLeft:10,
        fontWeight:'bold',
        
    }
})