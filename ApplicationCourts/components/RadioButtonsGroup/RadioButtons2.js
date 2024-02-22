import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useMemo,useState } from 'react'
import { RadioGroup } from 'react-native-radio-buttons-group';






const RadioButtons2=()=>{
    const radioButtons = useMemo(() => ([
    
    
    {
    
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'filet',
        value: 'option1'
        
    },
    {
        id: '2',
        label: 'chaines',
        value: 'option2'
    },
    {id: '3',
    label: 'sans filet',
    value: 'option3'
    },

    

]),[])
    const [selectedId, setSelectedId] = useState();
return(
    <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setSelectedId}
            selectedId={selectedId}
            layout='row'
            
            
        /> 
)
}
export default RadioButtons2

const styles = StyleSheet.create({})