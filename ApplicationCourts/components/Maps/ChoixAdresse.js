import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,SafeAreaView,Button } from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import * as Location from 'expo-location';


export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({ latitude: 0, longitude: 0 });
  const [isMarkerSelected, setMarkerSelected] = useState(false);
  const [address, setAddress]= useState('')


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
  useEffect(() => {
    const watchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }
  
        const locationListener = await Location.watchPositionAsync(
          { distanceInterval: 10 }, // Mettez à jour la position seulement si le déplacement est supérieur à 10 mètres
          (location) => {
            setCurrentLocation(location.coords);
            if (!isMarkerSelected) {
              reversegeocode(location.coords);
            }
          }
        );
  
        return () => {
          if (locationListener) {
            locationListener.remove();
          }
        };
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };
  
    watchLocation(); // Appel de la fonction au montage du composant
  }, [isMarkerSelected]);
  ;
  

  return (
    
    <SafeAreaView style={styles.container}>
      
      <View style={styles.card}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation ? currentLocation.latitude : 48.85679108910881,
            longitude: currentLocation ? currentLocation.longitude : 2.392559360270229,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.05,
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
        
        
      </View>
      <View><Text style={{color:'white',fontSize:25}}>Adresse localisée : </Text>
      
      <Text style={{backgroundColor:'white',fontSize:20}}>{address}</Text></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(197, 44, 35,1)',
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
    height: '80%',
  },
  map: {
    flex: 1,
  },
});
