import { StyleSheet, Text, View,Pressable,ScrollView,TouchableOpacity,Modal } from 'react-native'
import React from 'react'
import { useState,useMemo } from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group'
import DatePicker from 'react-native-modern-datepicker'
import {getToday, getFormatedDate} from 'react-native-modern-datepicker'
import BoutonValider from '../BoutonValider'
import { TimerPickerModal } from "react-native-timer-picker";
import RadioButtons from '../RadioButtonsGroup/RadioButtons'



function formatTime(hours, minutes) {
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

  

const AjoutMatch = () => {
    const [hour,setHour]=useState(null)
    const[openhour,setOpenHour]=useState(false)

    const today= new Date()
    const startDate = getFormatedDate(today.setDate(today.getDate()),'YYYY/MM/DD')
    
      const [open, setOpen] = useState(false)
    const [date,setDate]= useState('18/02/2024')
  
    function handleHour(){
        setOpenHour(!openhour)
    }
    function handleOnPress(){
      setOpen(!open)
    }
    function handleChange(PropDate){
      setDate(PropDate);
      console.log('Formatted Date:', date)
    }
    const [checked, setChecked] = React.useState('first');
    const [selectedId, setSelectedId] = useState();
    const labelStyle = { color: 'white' };
    
  return (
  
  <ScrollView style={{flex:1}}>

    <View style={{flex:1}}>
      <BoutonRetour />
    </View>
    <View style={{alignItems:'center'}}><Text style={{color:'rgba( 142, 8, 8 ,1)',fontSize:25}}>Organiser un match</Text></View>
    <View style={styles.formulairematch}>
        
        <Text style={{marginTop:20,marginLeft:20,color:'white'}}>Type de Match:</Text>
        <View style={{backgroundColor:'white', marginTop:20, width:255,borderRadius:40,alignSelf:'center'}}>
            
        <RadioButtons/>
   </View>
   <Text style={{marginTop:20,marginLeft:20,color:'white'}}>Date:</Text> 
   <TouchableOpacity onPress={handleOnPress} style={{alignItems:'center'}}><Text style={{textAlign:'center', color:'white',backgroundColor:'rgba( 142, 8, 8 ,1)',width:150, height:50,paddingTop:20,}}>Choisir</Text></TouchableOpacity>
   <View style={{alignItems:'center'}}>
   <Text style={{marginTop:20,marginLeft:20,backgroundColor:'white',textAlign:'center',width:255}}>{date}</Text>
</View>
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
<TouchableOpacity onPress={handleOnPress}><Text>Fermer</Text></TouchableOpacity>
</View>
</View>
 </Modal>
      <Text style={{marginTop:20,marginLeft:20,color:'white'}}>Heure:</Text>
      <TouchableOpacity onPress={handleHour} style={{alignItems:'center'}}><Text style={{textAlign:'center', color:'white',backgroundColor:'rgba( 142, 8, 8 ,1)',width:150, height:50,paddingTop:20,}}>Choisir</Text></TouchableOpacity>
     <View style={{alignItems:'center'}}>
   <Text style={{marginTop:20,marginLeft:20,backgroundColor:'white',textAlign:'center',width:255}}>{hour}</Text>
</View>
<TimerPickerModal
visible={openhour}
setIsVisible={setOpenHour}
onConfirm={(pickedDuration)=>{

    const { hours, minutes } = pickedDuration;
    setHour(formatTime(hours,minutes))
    handleHour()
    console.log(pickedDuration.hours)
}}
modalTitle='Heure du match'
onCancel={handleHour}
closeOnOverlayPress
// styles={{backgroundColor:'orange'}}
hideSeconds

/>

</View>
   
    <View style={{alignItems:'center'}}>

        <BoutonValider />
    </View>
    
    </ScrollView>
  )
}

export default AjoutMatch

const styles = StyleSheet.create({

     formulairematch :{
        backgroundColor:'rgba(197, 44, 35,1)',
        flex:1,
        width:350,
        height:400,
        alignSelf:'center',
        marginTop:20,
        borderRadius: 20,
        shadowColor:'black',
shadowOffset:{height:0, width:10},
shadowOpacity:0.5,
shadowRadius:20,
     }  ,
     boutonradio : {
      backgroundColor:'white'  
     } ,
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