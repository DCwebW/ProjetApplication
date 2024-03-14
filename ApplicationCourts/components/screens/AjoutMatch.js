import { StyleSheet, Text, View,Pressable,ScrollView,TouchableOpacity,Modal } from 'react-native'
import React, { useEffect,useState } from 'react'
import BoutonRetour from '../navigation/BoutonRetour'
import { RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-modern-datepicker'
import {getToday, getFormatedDate} from 'react-native-modern-datepicker'
import BoutonValider from '../BoutonValider'
import { TimerPickerModal } from "react-native-timer-picker";
import RadioButtons from '../RadioButtonsGroup/RadioButtons'
import { useNavigation } from '@react-navigation/native'
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../ConfigFirebase';



function formatTime(hours, minutes) {
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

const auth = getAuth()
  

const AjoutMatch = ({route}) => {
  const { terrainchoisi } = route.params ? route.params[0] ?? { terrainchoisi: 'Terrain non choisi' } : { terrainchoisi: 'Terrain non choisi' };
// Ici l'opérateur de coalescence nulle "??" me permet que terrain choisi ne soit jamais undefined et prend la valeur définie après 
  const navigation = useNavigation()
    const [hour,setHour]=useState(null)
    const[openhour,setOpenHour]=useState(false)
    const [user,setUser] = useState(null)

    const today= new Date()
    const startDate = getFormatedDate(today.setDate(today.getDate()),'YYYY/MM/DD')
    
      const [open, setOpen] = useState(false)
    const [date,setDate]= useState('18/02/2024')

    const [openTerrain,setOpenTerrain]= useState(false)
    
useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth,(user)=>{
    setUser(user)
  });
  return ()=> unsubscribe()

},[])
    

  const EnvoiMatchDB= async () =>
{
if (user){

  try{
    if(checked && date && terrainchoisi && hour){

      await addDoc(collection(db,'matchs'),{
    useruid : user.uid,
    date: date,
    heure : hour,
    terrain : terrainchoisi,
    typematch: checked,
      }) 
      console.log('Match mis en place')
    }

  }catch(error){
    console.log('Echec envoi du match', error)
  }
}

}



    function handleHour(){
        setOpenHour(!openhour)
    }
    function handleOnPress(){
      setOpen(!open)
    }
    function handleOpenTerrain(){
      setOpenTerrain(!openTerrain)
    }
    function handleChange(PropDate){
      setDate(PropDate);
      console.log('Formatted Date:', date)
    }
    const [checked, setChecked] = React.useState('first');
    


    function ChoixTerrainFavori(){
      navigation.navigate('TerrainsFavorisSelection'),
      handleOpenTerrain()

    }
    
  return (
  
  <ScrollView style={{flex:1}}>

    <View style={{flex:1}}>
      <BoutonRetour />
    </View>
    <View style={{alignItems:'center'}}><Text style={{color:'rgba( 142, 8, 8 ,1)',fontSize:25}}>Organiser un match</Text></View>
    <View style={styles.formulairematch}>
        
        <Text style={{marginTop:20,marginLeft:20,color:'white'}}>Type de Match:</Text>
        <View style={{ marginTop:20, width:255,borderRadius:40,alignSelf:'center'}}>
            
        
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
      <View style={{backgroundColor:'white',borderRadius:20}}>
      <RadioButton
        value="2vs2"
        status={ checked === '2vs2' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('2vs2')}
        
      /></View>
      <Text>2vs2</Text>
      <View style={{backgroundColor:'white',borderRadius:20}}>
      <RadioButton
        value="3vs3"
        status={ checked === '3vs3' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('3vs3')}
        
      /></View>
      <Text>3vs3</Text>
      <View style={{backgroundColor:'white',borderRadius:20,}}>
      <RadioButton
        value="5vs5"
        status={ checked === '5vs5' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('5vs5')}
        
      /></View>
      <Text>5vs5</Text>
      </View>
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
<View>
<Text style={{marginTop:20,marginLeft:20,color:'white'}}> Terrain : </Text>

</View>
<View style={{height:50, backgroundColor:'white' ,width:200, alignSelf:'center',justifyContent:'center'}}>
  <Text style={{color:'black', textAlign:'center'}} > {terrainchoisi}</Text>
</View>
<TouchableOpacity onPress={handleOpenTerrain} style={{alignItems:'center'}}><Text style={{textAlign:'center', color:'white',backgroundColor:'rgba( 142, 8, 8 ,1)',width:150, height:50,paddingTop:20,marginTop:10}}>Choisir</Text></TouchableOpacity>
<Modal
visible={openTerrain}
transparent={true}
animationType='slide'
>

  <View
  style={styles.centeredView}
  >
    <View style={styles.modalView}>

     
       <TouchableOpacity style={{alignItems:'center'}}>
        <View style={{backgroundColor:'rgba( 142, 8, 8 ,1)',width:250, height:50,paddingTop:20,borderRadius:15}}>
        <Text style={{textAlign:'center', color:'white',}}>Choisir Terrain sur la carte</Text>
        </View> 
        </TouchableOpacity>
    
       <TouchableOpacity style={{alignItems:'center'}} onPress={ChoixTerrainFavori}>
        <View style={{backgroundColor:'rgba( 142, 8, 8 ,1)',width:250, height:50,paddingTop:20,borderRadius:15,marginTop:20}}> 
        <Text style={{textAlign:'center', color:'white',}}>Terrains Favoris</Text>
         </View>
        </TouchableOpacity>
        <View style={{marginTop:20}}>
     <TouchableOpacity onPress={handleOpenTerrain}><Text>Fermer</Text></TouchableOpacity> 
    </View>
    </View>
  </View>


</Modal>
</View>
   
    <View style={{alignItems:'center'}}>

        <BoutonValider onPress={EnvoiMatchDB}/>
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
        height:500,
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