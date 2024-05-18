import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MapView,{Marker,Callout,Circle} from 'react-native-maps';
import * as Location from 'expo-location';
import TerrainsEnregistrésMarqueurs from './TerrainsEnregistrésMarqueurs';



// Un commentaire pour test statique 

export default function RechercheMap() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true); // État pour indiquer le chargement
  const [stop, setStop] = useState(0); // État pour indiquer le chargement
  

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log('Current location:', location);
        setCurrentLocation(location.coords); // Mettre à jour l'état avec la position actuelle
        setLoading(false); // Mettre à jour l'état de chargement une fois que la localisation est obtenue
        setStop(1)
      } catch (error) {
        console.error('Error getting location:', error);
        setLoading(false); // Mettre à jour l'état de chargement en cas d'erreur
      }
    };
    if (stop == 0) {
      getCurrentLocation();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recherche de terrain</Text>
      <View style={styles.card}>
        {loading ? ( // Afficher l'ActivityIndicator si loading est vrai
          <ActivityIndicator style={styles.loadingIndicator} size="large" color="#1976D2" />
        ) : (
          currentLocation && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              mapType='standard'
              userInterfaceStyle='dark'>
             {/* <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title={'Ma position'}
                description={'Premier Terrain !'}
              >
                <Callout>
                  <Text>Voici un Premier Callout</Text>
                </Callout>
              </Marker>
              <Circle
                center={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                radius={1000} // en mètres
                fillColor="rgba(27, 237, 105, 0.5)"
              /> 
               <TerrainsEnregistrésMarqueurs /> */}
            </MapView>
          )
        )}
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
    color: 'rgba(197, 44, 35,1)',
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
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
