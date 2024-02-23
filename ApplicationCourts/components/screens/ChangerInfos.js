import { StyleSheet, Text, View, ScrollView,TextInput } from 'react-native'
import React from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import Avatar from '../drawer/ImagePicker'

const ChangerInfos = () => {
  return (
    <ScrollView >
     <View ><BoutonRetour/></View> 
     <View style={styles.avatar}><Avatar/></View>

     <View style={styles.changeinfos}>
        <View>
        <Text style={{margin:20}}>Prénom</Text>
        <TextInput placeholder='Changer Prénom' style={{backgroundColor:'white', width: 220,height:30,marginLeft:50}}></TextInput>
        </View>
        <Text style={{margin:20}}>Nom</Text>
        <TextInput placeholder='Changer Nom' style={{backgroundColor:'white', width: 220,height:30,marginLeft:50}}></TextInput>
     </View>
      
    </ScrollView>
  )
}

export default ChangerInfos

const styles = StyleSheet.create({

    avatar:{
       marginTop:20 ,
       backgroundColor:'black', 
       height:200
      
    },
    changeinfos:{
        
        backgroundColor:"rgba(197, 44, 35,1)",
        minHeight:200,
        minWidth:200,
        margin:20
    }
})