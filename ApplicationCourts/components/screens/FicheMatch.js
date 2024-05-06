import {  StyleSheet, Text,  View,Image } from 'react-native'
import React,{ useEffect ,useState} from 'react'
import { query,where,collection, getDocs,} from 'firebase/firestore'
import { db } from '../../ConfigFirebase2'
import { onAuthStateChanged,getAuth } from 'firebase/auth'


import BoutonRetour from '../navigation/BoutonRetour'
const FicheMatch = ({route}) => {


    const {matchid}= route.params 
    const auth = getAuth()

    const [user,SetUser]=useState(null)
    const [matchs,SetMatchs]=useState([])


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
            console.log('Données des matchs non récoltés')
        }
        }
    loadUserData()
        return ()=>{
            unsubscribe()
        }

    }, [user])




  return (
    <View>
        <View>
<BoutonRetour/>

        </View>
{ matchs.map((item)=>{
if (matchid === item.id) {

return(
<View key = {item.id} style={{marginTop:150,}}>
<Image source={require('../../assets/png/depositphotos_331770894-stock-photo-professional-basketball-court-arena-background.jpg')} style={styles.imagematch} /> 
        <Text> Match n°{item.id}</Text>     
         <Text> {item.date}</Text>
         <Text>{item.heure}</Text>
         <Text>{item.terrain}</Text>
                </View>)    
}



})}
        
        
    </View>
  )
}

export default FicheMatch

const styles = StyleSheet.create({

    imagematch:{
        height:200,
        width: 390,
        borderRadius:10,
        alignSelf:'center'
    }
})