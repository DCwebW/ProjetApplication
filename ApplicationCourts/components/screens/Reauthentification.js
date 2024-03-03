import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getAuth,reauthenticateWithCredential } from 'firebase/auth'

const auth = getAuth();
const user = auth.currentUser

const credential = promp

const Reauthentification = () => {
  return (
    <View>
      <Text>Reauthentification</Text>
    </View>
  )
}

export default Reauthentification

const styles = StyleSheet.create({})