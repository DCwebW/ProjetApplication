import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,SafeAreaView,Button } from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({ latitude: 0, longitude: 0 });
  const [isMarkerSelected, setMarkerSelected] = useState(false);
  const [address, setAddress]= useState('')
 const geolocation = Geocoder.init()
  const handleMarkerPress = () => {
    setMarkerSelected(true);
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
  }, [markerPosition]);
  const reversegeocode = async (position) => {
    try {
      const reversegeocodedLocation = await Location.reverseGeocodeAsync({
        longitude: position.longitude,
        latitude: position.latitude,
      });

      if (reversegeocodedLocation.length > 0) {
        setAddress(`${reversegeocodedLocation[0].name}, ${reversegeocodedLocation[0].city}`);
        console.log('Adresse trouvée :', `${reversegeocodedLocation[0].name}, ${reversegeocodedLocation[0].city}`);
      } else {
        setAddress('Adresse non trouvée');
        console.log('Adresse non trouvée');
      }
    } catch (error) {
      console.error('Erreur géocodage de la position', error);
      setAddress('Erreur lors de la géocodification');
    }
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <CustomText<Text style={styles.title}>Ma Carte de Géolocalisation 🗺️</CustomText>
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
          onLongPress={(event) => {
            const newMarkerPosition = {
              latitude: event.nativeEvent.coordinate.latitude,
              longitude: event.nativeEvent.coordinate.longitude,
            };
            setMarkerPosition(newMarkerPosition);
            setMarkerSelected(true);
            reversegeocode(newMarkerPosition); // Appeler la fonction reversegeocode avec la nouvelle position du marqueur
          }}
          >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              draggable
              onDragEnd={(e) => {
                const newMarkerPosition = e.nativeEvent.coordinate;
                setMarkerPosition(newMarkerPosition);
                reversegeocode(newMarkerPosition); // Appeler la fonction reversegeocode avec la nouvelle position du marqueur
              }}
              onLongPress={() => setMarkerSelected(true)}
              >
             
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
        <CustomText<Text>Adresse localisée : {address}</CustomText>
        {/* <Button title='Localiser adresse'onPress={reversegeocode(markerPosition)}></Button> */}
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
