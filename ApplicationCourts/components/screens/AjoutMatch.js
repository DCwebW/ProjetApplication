import { StyleSheet, View,  ScrollView,   } from 'react-native'
import React, { useEffect, useState } from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import RadioButtonsTypeMatch from '../RadioButtonsGroup/RadioButtonsTypeMatch'
import BoutonValider from '../BoutonValider'
import { TextInput,Button } from 'react-native-paper'
import ModalTimePicker from '../Modals/ModalTimePicker'
import ModalDatePicker from '../Modals/ModalDatePicker'
import ModalChoixTerrain from '../Modals/ModalChoixTerrain'
import {getFormatedDate} from 'react-native-modern-datepicker'
import { useNavigation } from '@react-navigation/native'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CustomText from '../ThemeContext/CustomText'

import EnvoiMatchDB from '../../ModelView/EnvoiMatchDB';





const auth = getAuth()


const AjoutMatch = ({ route }) => {
  const { terrainchoisi } = route.params ? route.params[0] ?? { terrainchoisi: 'Terrain non choisi' } : { terrainchoisi: 'Terrain non choisi' };
  // Ici l'opérateur de coalescence nulle "??" me permet que terrain choisi ne soit jamais undefined et prend la valeur définie après 
  const navigation = useNavigation()
  const [hour, setHour] = useState(null)
  const [openhour, setOpenHour] = useState(false)
  const [user, setUser] = useState(null)



  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(startDate)

  const [openTerrain, setOpenTerrain] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    });
    return () => unsubscribe()

  }, [])

  const userID = user ? user.uid : null;


const today= new Date()
        const startDate = getFormatedDate(today.setDate(today.getDate()),'YYYY/MM/DD')





  const handleSubmit = () => {
    EnvoiMatchDB({ user, userID, date, hour, terrainchoisi, checked })
  }

  function handleHour() {
    setOpenHour(!openhour)
  }
  function handleOnPress() {
    setOpen(!open)
  }
  function handleOpenTerrain() {
    setOpenTerrain(!openTerrain)
  }
  function handleChange(PropDate) {
    setDate(PropDate);
    console.log('Formatted Date:', date)
  }
  const [checked, setChecked] = React.useState('first');



  function ChoixTerrainFavori() {
    navigation.navigate('TerrainsFavorisSelection')
    handleOpenTerrain()

  }

  return (

    <ScrollView style={{ flex: 1  }}>
      <View style={{ flex: 1 , }}>
        <BoutonRetour />
      </View>
      <View style={{ alignItems: 'center' }}><CustomText style={{ color: 'rgba( 142, 8, 8 ,1)', fontSize: 25 }}>Organiser un match</CustomText></View>
      <View style={styles.formulairematch}>

        <CustomText style={{ marginTop: 20, marginLeft: 20, color: 'white' }}>Type de Match:</CustomText>
        <RadioButtonsTypeMatch setChecked={setChecked} checked={checked} />

        
        
        <View style={[styles.elementsMatch,{marginLeft:17}]}>
          <CustomText>Date:</CustomText>
          <TextInput value={date} disabled={true} style={styles.inputsMatch}/>
<Button onPress={handleOnPress} style={styles.boutonChoixElements} >
          <CustomText style={{ textAlign: 'center', color: 'white' }}>
          Choisir</CustomText></Button>
          
        </View>
        <ModalDatePicker openModalDatePicker={open} date={date} ChangeDate={handleChange} setOpenModalDatePicker={handleOnPress} />

        <View style={styles.elementsMatch}>
        <CustomText style={{  color: 'white' }}>Heure:</CustomText>
          <TextInput value={hour} disabled={true} style={styles.inputsMatch}/>
          <Button onPress={handleHour} style={styles.boutonChoixElements}>
          <CustomText style={{ textAlign: 'center', color: 'white', }}>Choisir</CustomText></Button>
        </View>
      
<ModalTimePicker TimePickerouvert={openhour} OuvrirTimePicker={setOpenHour} choisirHeure={setHour} />
        <View style={{flexDirection:'row', marginTop:35}}>
          <CustomText style={{ marginTop: 20, marginLeft: 5, color: 'white' }}> Terrain : </CustomText>

        
        <View style={{ height: 50, backgroundColor: 'white', width: 200, alignSelf: 'center', justifyContent: 'center' }}>
          <CustomText style={{ color: 'black', textAlign: 'center' }} > {terrainchoisi}</CustomText>
        </View>
       </View>

        <Button onPress={handleOpenTerrain} style={[styles.boutonChoixElements, {alignSelf:'center', marginTop:20, marginBottom:20}]}>
          <CustomText style={{color:'white'}}>
            Choisir</CustomText></Button>
        
        <ModalChoixTerrain choixTerrainouvert={openTerrain} ChoixTerrainFavori={ChoixTerrainFavori} ouvrirchoixTerrain={handleOpenTerrain}/>

      </View>

      <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 2 }}>

        <BoutonValider onPress={handleSubmit} />
      </View>

    </ScrollView>
  )
}

export default AjoutMatch

const styles = StyleSheet.create({

  formulairematch: {
    backgroundColor: 'rgba(197, 44, 35,1)',
    

    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    marginBottom:10
  },

  elementsMatch:{
    flexDirection:'row', 
    gap:5,
     marginTop:20,
     alignItems:'center',
     marginLeft:10

  },
  
  inputsMatch:{
    backgroundColor:'#f0b9a6', 
    width:200, 
    textAlign:'center',
   
    
  },
  boutonChoixElements:{
    backgroundColor: 'rgba( 142, 8, 8 ,1)',
     width: 100, 
     height: 50,
  }


})