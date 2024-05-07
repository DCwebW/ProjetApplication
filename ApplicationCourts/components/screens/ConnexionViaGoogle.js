import{ StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { getAuth,  GoogleAuthProvider, } from "firebase/auth";
import * as AuthSession from 'expo-auth-session';

import React from 'react';

const ConnexionViaGoogle = () => {
  const auth = getAuth()
  

  const signInWithGoogle = async () => {
    try {
      const { type, params } = await AuthSession.startAsync({
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth' +
          '?client_id=505324618370-ula1tlqg3qe9arsjn85t6a03m2fs0hgr.apps.googleusercontent.com' +
          '&redirect_uri=https://loginfirebase-222bd.firebaseapp.com/__/auth/handler' +
          '&response_type=token' +
          '&scope=email%20profile',
      });
  
      if (type === 'success') {
        // Récupérer le token d'identification Google depuis les paramètres
        const idToken = params.id_token;
        const credential = GoogleAuthProvider.credential(idToken);

        // Utiliser signInWithCredential avec l'objet d'authentification Firebase et les informations d'identification
        const result = await signInWithCredential(auth, credential)
        // Utilisez le token d'identification (idToken) pour l'authentification avec Firebase
        // ...
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.boutonGoogle}>
      <TouchableOpacity onPress={signInWithGoogle}>
        <View style={styles.connexionGoogle}>
          <Image style={styles.logoGoogle} source={require('../../assets/png/google-logo-9822.png')} />
          <Text style={styles.textGoogle}>Se connecter avec Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ConnexionViaGoogle;

const styles = StyleSheet.create({
  connexionGoogle: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(197, 44, 35,1)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boutonGoogle: {
    alignSelf: 'center',
    marginTop: 50
  },
  logoGoogle: {
    height: 35,
    width: 35
  },
  textGoogle: {
    color: 'white',
    marginLeft: 10
  }
});
