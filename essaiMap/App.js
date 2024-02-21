import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,SafeAreaView } from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({ latitude: 0, longitude: 0 });
  const [isMarkerSelected, setMarkerSelected] = useState(false);

  const handleMarkerPress = () => {
    setMarkerSelected(true);
  };

  const handleMapPress = (event) => {
    if (isMarkerSelected) {
      setMarkerPosition({
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      });
      setMarkerSelected(false);
    }
  };
  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords); // Mise à jour de l'état avec les coordonnées actuelles
        console.log('Current location:', location);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getCurrentLocation(); // Appel de la fonction au montage du composant

    // Le tableau vide en second argument signifie que ce hook s'exécute uniquement lors du montage du composant.
  }, []);

  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ma Carte de Géolocalisation 🗺️</Text>
      <View style={styles.card}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation ? currentLocation.latitude : 48.85679108910881,
            longitude: currentLocation ? currentLocation.longitude : 2.392559360270229,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType='standard'
          userInterfaceStyle='dark'
          onLongPress={handleMapPress}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              draggable
              onDragEnd={(e) => setMarkerPosition(e.nativeEvent.coordinate)}
              onLongPress={handleMarkerPress}>
             
            </Marker>
          )}
          <Circle
            center={{
              latitude: currentLocation ? currentLocation.latitude : 48.85679108910881,
              longitude: currentLocation ? currentLocation.longitude : 2.392559360270229,
            }}
            radius={1000} // en mètres
            fillColor="rgba(27, 237, 105,0.5)"
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    width: '90%',
    height: '30%',
  },
  map: {
    flex: 1,
  },
});
