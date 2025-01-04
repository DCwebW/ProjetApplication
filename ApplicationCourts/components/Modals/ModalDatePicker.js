import React from 'react'
import { Modal,StyleSheet,View,TouchableOpacity,Text } from 'react-native'
import DatePicker,{getToday, getFormatedDate} from 'react-native-modern-datepicker'


const ModalDatePicker = ({openModalDatePicker,date,ChangeDate,setOpenModalDatePicker}) => {

    const today= new Date()
        const startDate = getFormatedDate(today.setDate(today.getDate()),'YYYY/MM/DD')
  return (
    <Modal 
          animationType='slide'
          transparent={true}
          visible={openModalDatePicker}
          >
    
    <View style={styles.centeredView}>
    <View style={styles.modalView}>
    <DatePicker
      mode='calendar'
      minimumDate={startDate}
      selected={date}
      onDateChange={ChangeDate}
      
      
      />
    <TouchableOpacity onPress={setOpenModalDatePicker}><Text>Fermer</Text></TouchableOpacity>
    </View>
    </View>
     </Modal>
  )
}

export default ModalDatePicker

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