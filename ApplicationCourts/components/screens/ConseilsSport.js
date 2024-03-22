import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const ConseilsSport = () => {
   

    const Conseils = [{
        id: "1",
        conseil:"Bois de l'eau régulièrement"
    },
{
    id:'2',
    conseil:'Etire toi toujours après une séance sportive intensive'
},
{
    id:'3',
    conseil:'La compétition et la soif de vaincre n\'empêche d\'être fair-play'
},
]


  return (
    <ScrollView horizontal>
    <View style={{flexDirection:'row'}}>
{Conseils.map((item)=>{
    if(item.id ==="1"){
return(
    
<View key={item.id} style={styles.conseilView}>
<LinearGradient

 colors={['rgba(197, 44, 35,1)','orange']}
 start={{x:0.6,y:0}}
 style={styles.background}/>
<Text id={item.id}>{item.conseil}</Text>
</View>
)}

else{
return(
    <View key={item.id} style={styles.conseilView}>

<LinearGradient

 colors={['rgba(14,130,201,1)','orange']}
 start={{x:0.6,y:0}}
 style={styles.background}/>
<Text id={item.id}>{item.conseil}</Text>
</View>)

}

})}

    </View>
</ScrollView>
    )

    

}

export default ConseilsSport

const styles = StyleSheet.create({

    conseilView:{
        width:380,
        height:200,
        marginHorizontal:5,
        borderRadius:20,
        shadowOffset:5,
        shadowOpacity:0.8,
        shadowRadius:4
    },
    background:{
        position:'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 200,
    },

})