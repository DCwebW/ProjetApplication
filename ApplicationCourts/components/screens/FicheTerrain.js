import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, useWindowDimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from "firebase/firestore";
import BoutonRetour from '../navigation/BoutonRetour';
import SignalementPresence from '../SignalementPresence';
import { db } from '../../ConfigFirebase2';
import fetchTerrains from '../../ModelView/fetchTerrains'; // Import de la fonction fetchTerrains
import ajoutFavori from '../../ModelView/ajoutFavori';
import removeFavori from '../../ModelView/removeFavori';
import CustomText from '../ThemeContext/CustomText';
import AbonnementTerrainButton from '../../ModelView/abonnementTerrainButton';


const FicheTerrain = ({ route }) => {
  const [terrain, setTerrain] = useState();
  const [buttonpressed, setButtonPressed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [user, setUser] = useState(null);
  const [terrainpresent, setTerrainPresent] = useState();
  const { name, id } = route.params;
  const { width } = useWindowDimensions();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const loadTerrains = async () => {
      try {
        const terrains = await fetchTerrains(db); // Appel de la fonction externalisée
        setTerrain(terrains);
      } catch (error) {
        console.error('Erreur lors du chargement des terrains', error);
      }
    };

    loadTerrains();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkTerrainPresent = async () => {
      const TerrainPresentQuery = query(collection(db, 'terrainsfavoris'), where('terrains', 'array-contains', id));
      const snapshot = await getDocs(TerrainPresentQuery);
      const isTerrainPresent = !snapshot.empty;
      setTerrainPresent(isTerrainPresent);
      setButtonPressed(isTerrainPresent);
    };

    checkTerrainPresent();
  }, [id]);

  const handleButtonPress = () => {
    if (!user) return; // Vérifier si l'utilisateur est connecté
    if (buttonpressed) {
      removeFavori(db, user.uid, id, setButtonPressed);
    } else {
      ajoutFavori(db, user.uid, id, setButtonPressed, setShowMessage);
    }
  };

  const renderItem = ({ item }) => {
    if (name === item.name) {
      return (
        <View>
          <BoutonRetour />
          <CustomText style={{ textAlign: 'center', fontSize: 25, color: 'rgba(197, 44, 35,1)' }}>{item.name}</CustomText>
          <Image source={{ uri: item.images }} style={{ width, height: 300, marginTop: 10 }} />
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <CustomText>{item.adresse}</CustomText>
              <CustomText>Type de filet : {item.typefilet}</CustomText>
              <CustomText>{id}</CustomText>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={handleButtonPress}>
                {buttonpressed ? (
                  <AntDesign name='heart' color={'rgba(197, 44, 35,1)'} size={50} />
                ) : (
                  <AntDesign name='hearto' size={50} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {showMessage && <View style={styles.messageContainer}><CustomText>Mis en favori</CustomText></View>}
          <SignalementPresence nameTerrain={item.name} idTerrain={id} />

          <AbonnementTerrainButton Id_terrain={id}/>
        </View>
      );
    }
  };

  return (
    <View>
      <FlatList
        data={terrain}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    zIndex: 1,
    height: 40,
    marginTop: 260,
    marginLeft: 300
  },
});

export default FicheTerrain;
