import { StyleSheet,  View,ScrollView,Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomText from '../ThemeContext/CustomText'



const PageDebutAction = () => {
  const navigation = useNavigation()
  return (
    <ScrollView>
    
    <View style={styles.actions}>
<Pressable onPress={()=>{navigation.navigate('AjoutMatch')}} style={({ pressed }) => (pressed ? styles.actionpressin : styles.action)}><CustomText style={styles.actiontext}>Ajout Match</CustomText></Pressable>
<Pressable onPress={()=>{ navigation.navigate('AjoutTerrain')}} style={({ pressed }) => (pressed ? styles.actionpressin : styles.action)} ><CustomText style={styles.actiontext}>Ajout Terrain</CustomText></Pressable>
    </View>
    </ScrollView>
  )
}

export default PageDebutAction

const styles = StyleSheet.create({

  logo:{
    width:126,
    height:90,
    
  },
  logotitre:{
alignItems:'center',
marginTop:30
  },
  action:{

    backgroundColor:'rgba(197, 44, 35,0.5)',
    width: 250,
    height:150,
    justifyContent:'center',
    borderRadius:20,
    margin: 30,
    borderBottomColor:'rgba(0, 0, 0,0.5)',
    borderBottomWidth:2,
    borderRightColor:'rgba(0, 0, 0,0.5)',
    borderRightWidth:2

  },
  actionpressin:{

    backgroundColor:'rgba(197, 44, 35,1)',
    width: 250,
    height:150,
    justifyContent:'center',
    borderRadius:20,
    margin: 20,
    borderBottomColor:'rgba(0, 0, 0,0.5)',
    borderBottomWidth:2,
    borderRightColor:'rgba(0, 0, 0,0.5)',
    borderRightWidth:2

  },
  actiontext:{
    textAlign:'center',
    color:'white'
    
  },
  actions:{
    marginTop:100,
    alignItems:'center',
    
  },
})