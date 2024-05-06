import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';


const SignalementPresence = ({ nameTerrain }) => {
  

  return (
    <TouchableOpacity >
      <View style={styles.signalView}>
        <Text>Signaler sa présence</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SignalementPresence;

const styles = StyleSheet.create({
  signalView: {
    backgroundColor: 'rgba(197, 44, 35,1)',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginTop: 35,
    width: 200,
    alignSelf: 'center',
    borderRadius: 15
  }
});
