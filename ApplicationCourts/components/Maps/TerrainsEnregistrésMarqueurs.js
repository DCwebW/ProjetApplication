import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDocs, collection } from "firebase/firestore"
import { db } from '../../ConfigFirebase2'
import { Marker, Callout, CalloutSubview } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'

const TerrainsEnregistrésMarqueurs = () => {
    const [marqueurs, setMarqueurs] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        const fetchMarqueurs = async () => {
            const docRef = collection(db, 'terrains')
            getDocs(docRef)
                .then((QuerySnapshot) => {
                    const data = QuerySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setMarqueurs(data)
                })
        }
        fetchMarqueurs()
    }, [])

    const CustomMarker = () => (
        <View style={styles.marker}>
            <Image 
                style={styles.markerImage} 
                source={require('../../assets/png/icons8-basketball-48.png')} 
            />
        </View>
    );

    return (
        marqueurs.map(marqueur => (
            <Marker
                key={marqueur.id}
                coordinate={{
                    latitude: marqueur.latitude,
                    longitude: marqueur.longitude,
                }}
            >
                <CustomMarker />
                <Callout style={styles.callout}>
                    <View>
                        
                        <View style={styles.calloutButtons}>
                            <CalloutSubview
                                onPress={() => navigation.navigate('Fiche', {
                                    name: marqueur.name,
                                    image: marqueur.images,
                                    id: marqueur.id,
                                })}
                            >
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Voir fiche du terrain</Text>
                                </View>
                            </CalloutSubview>
                            
                        
                        </View>
                        <Text style={styles.calloutTitle}>{marqueur.name} :</Text>
                        <Image 
                            source={{ uri: marqueur.images }} 
                            style={styles.calloutImage} 
                        />
                    </View>
                </Callout>
                
            </Marker>
        ))
    )
}

export default TerrainsEnregistrésMarqueurs

const styles = StyleSheet.create({
    marker: {
        backgroundColor: 'rgba(197, 44, 35,1)',
        borderRadius: 40,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerImage: {
        width: 30,
        height: 30,
    },
    callout: {
        width: 300,
        height: 200,
        padding:5
    },
    calloutTitle: {
        fontSize: 20,
    },
    calloutImage: {
        width: 200,
        height: 100,
        marginLeft: 20,
        marginTop: 20,
    },
    calloutButtons: {
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'rgba(197, 44, 35,1)',
        width: 150,
        marginTop: 10,
        alignItems: 'center',
        height: 35,
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
    },
})
