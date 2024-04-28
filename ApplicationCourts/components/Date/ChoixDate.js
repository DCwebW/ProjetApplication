import { View, Text,Modal,StyleSheet,TouchableOpacity,SafeAreaView } from 'react-native'
import React from 'react'
import DatePicker from 'react-native-modern-datepicker'
import {getToday, getFormatedDate} from 'react-native-modern-datepicker'
import { useState } from 'react'

const ChoixDate = () => {
    const today= new Date()
    const startDate = getFormatedDate(today.setDate(today.getDate()),'YYYY/MM/DD')
    
      const [open, setOpen] = useState(false)
    const [date,setDate]= useState('18/02/2024')
  
    function handleOnPress(){
      setOpen(!open)
    }
    function handleChange(selectedDate){
      setDate(getFormatedDate(selectedDate, 'DD/MM/YYYY'));
    }
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={handleOnPress}> <Text>Choisir</Text></TouchableOpacity>
        <Text>{date}</Text>
      <Modal 
      animationType='slide'
      transparent={true}
      visible={open}
      >
      <View style={styles.centeredView}>
      <View style={styles.modalView}>
  <DatePicker
  mode='calendar'
  minimumDate={startDate}
  selected={date}
  onDateChange={handleChange}
  />
      <TouchableOpacity onPress={handleOnPress}> <Text>Close</Text></TouchableOpacity>
      </View>
      </View>
      
      </Modal>
      </SafeAreaView>
    );
  }
  
 
    // Un commentaire pour Github Actions
    // Un deuxième
  
// UN troisième
// Un quatrième
// Un cinquième
export default ChoixDate 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
      alignItems:'center',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
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
    },  });