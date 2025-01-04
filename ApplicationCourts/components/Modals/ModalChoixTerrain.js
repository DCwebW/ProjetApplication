import React from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity, Modal } from 'react-native'

const ModalChoixTerrain = ({choixTerrainouvert, ChoixTerrainFavori, ouvrirchoixTerrain}) => {
  return (
    <Modal
              visible={choixTerrainouvert}
              animationType='slide'
              transparent
            >
              <View
                style={styles.centeredView}
              >
                <View style={styles.modalView}>
    
    
                  <TouchableOpacity style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'rgba( 142, 8, 8 ,1)', width: 250, height: 50, paddingTop: 20, borderRadius: 15 }}>
                      <Text style={{ textAlign: 'center', color: 'white', }}>Choisir Terrain sur la carte</Text>
                    </View>
                  </TouchableOpacity>
    
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={ChoixTerrainFavori}>
                    <View style={{ backgroundColor: 'rgba( 142, 8, 8 ,1)', width: 250, height: 50, paddingTop: 20, borderRadius: 15, marginTop: 20 }}>
                      <Text style={{ textAlign: 'center', color: 'white', }}>Terrains Favoris</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ marginTop: 20 }}>
                    <TouchableOpacity onPress={ouvrirchoixTerrain}><Text>Fermer</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
    
    
            </Modal>
  )
}

export default ModalChoixTerrain

const styles =StyleSheet.create({

    centeredView:{flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:22},
      
        modalView:{
          margin:20,
          backgroundColor:'white',
          borderRadius:20,
          width:'90%',
          padding:35,
          alignItems:'center',
          shadowColor:'#000',
          shadowOffset:{
            width:0,
            height:2,
          },
          shadowOpacity:0.25,
          shadowRadius:4,
          elevation:5
        }  ,

})