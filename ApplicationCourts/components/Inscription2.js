import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GoogleAuthProvider,FacebookAuthProvider,TwitterAuthProvider,getAuth,linkWithRedirect } from 'firebase/auth'

const provider = new GoogleAuthProvider()
const auth = getAuth()

linkWithRedirect(auth.currentUser,provider)
.then((result)=>{
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const user = result.user 
})
.catch((error) =>{
    console.error("Authentification échouée",error)
})


const Inscription2 = () => {
  return (
    <View>
      <Text>Inscription2</Text>
    </View>
  )
}

export default Inscription2

const styles = StyleSheet.create({})