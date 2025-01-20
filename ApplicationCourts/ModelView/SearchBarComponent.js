import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import fetchTerrains from './fetchTerrains'; // Assurez-vous que fetchTerrains est correctement importé
import { useNavigation } from '@react-navigation/native';

const SearchBarComponent = ({ db, onSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigation = useNavigation();

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.length > 0) {
            try {
                // Récupération des terrains à partir de Firestore
                const terrains = await fetchTerrains(db);

                // Filtrage des terrains en fonction de la recherche
                const filteredResults = terrains.filter(terrain =>
                    terrain.name.toLowerCase().includes(query.toLowerCase())
                );
                setResults(filteredResults);
                onSearchResults(filteredResults); // Passer les résultats filtrés au parent
            } catch (error) {
                console.error('Erreur lors de la recherche de terrains :', error);
            }
        } else {
            setResults([]);
            onSearchResults([]); // Réinitialiser les résultats si la barre est vide
        }
    };

    const renderItem =({item}) =>{
        return(
        <View>
        <TouchableOpacity
                            onPress={() => navigation.navigate('Fiche', {
                                name: item.name,
                                image: item.images, // Assurez-vous que `images` est un tableau ou une image
                                id: item.id
                            })}
                        >
                            <View style={styles.resultItem}>
                                <Text style={styles.resultText}>{item.name}</Text>
                                <Text style={styles.resultAddress}>{item.adresse}</Text>
                            </View>
                        </TouchableOpacity></View>)


    }

    return (
        <View style={{ marginBottom: 10 }}>
            <Searchbar
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Rechercher un terrain..."
                mode="view"
                theme={{ colors: { primary: 'rgba(197, 44, 35,1)' } }}
                style={{ backgroundColor: 'rgba(197, 44, 35,0.1)' }}
            />
            {searchQuery.length > 0 && (
                <View
                >                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    resultItem: {
        padding: 10,
        height: 70,  // Augmentez la hauteur pour mieux voir les éléments
        backgroundColor: 'rgba(197, 44, 35, 0.2)', // Fond rouge pâle
        marginBottom: 10, // Espace entre les éléments
        borderRadius: 8,  // Bordures arrondies pour un effet plus doux
        shadowColor: '#000', // Ombre pour ajouter de la profondeur
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // Ombrage sur Android
    },
    resultText: {
        fontSize: 16,
        color: '#333', // Texte gris foncé pour un bon contraste
        fontWeight: 'bold', // Mettre en gras pour une meilleure visibilité
    },
    resultAddress: {
        fontSize: 14,
        color: '#666', // Texte légèrement plus clair pour l'adresse
        marginTop: 5, // Un peu d'espace entre le nom et l'adresse
    },
});

export default SearchBarComponent
