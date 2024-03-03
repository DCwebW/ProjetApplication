import { View, Text, Pressable,StyleSheet,Image} from 'react-native'
import React from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import { SvgUri } from 'react-native-svg'

const Details = ({navigation}) => {
  return (
    <View style={{width:100}}>
     <SvgUri width="50" height="50" source={require('../../assets/courts-favicon-color.svg')} />
    
      
    </View>
  )
}

export default Details


