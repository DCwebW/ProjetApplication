import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const LogoHeader = () => {
  return (
    <Image style={styles.logo}source={require('../../assets/png/logo-no-background.png')}/>
  )
}

export default LogoHeader

const styles = StyleSheet.create({
    logo:{
        width:60,
      height:44,
      marginBottom:6
    }
})