import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, { Marker, Circle, Polyline, Callout } from 'react-native-maps';
import * as Location from 'expo-location';


export default function Map() {

  useEffect(()=>{
  const getCurrentLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log('Current location:', location);
  } catch (error) {
    console.error('Error getting location:', error);
  }
};  

getCurrentLocation()
  },[])
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recherche de terrain</Text>
      <View style={styles.card}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 48.85679108910881,
            longitude: 2.392559360270229,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType='standard'
          userInterfaceStyle='dark'
          >
          <Marker
            coordinate={{
              latitude: 48.85679108910881,
              longitude: 2.392559360270229,
            }}
            title={'Ma position'}
            description={'Premier Terrain !'}>
            <Callout>
              <Text>Voici un Premier Callout</Text>
            </Callout>
            
          </Marker>
          <Circle
            center={{
              latitude: 48.85679108910881,
              longitude: 2.392559360270229,
            }}
            radius={1000} // en mètres
            fillColor="rgba(27, 237, 105,0.5)"
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    
    margin: 20,
    color:'rgba(197, 44, 35,1)'
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    width: '97%',
    height: '100%',
  },
  map: {
    flex: 1,
   
  },
});