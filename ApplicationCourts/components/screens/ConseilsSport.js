import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'

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
return(

<View style={{width:380, height:200}}>
<Text id={item.id}>{item.conseil}</Text>
</View>


)

})}

    </View>
</ScrollView>
    )

    

}

export default ConseilsSport

const styles = StyleSheet.create({})