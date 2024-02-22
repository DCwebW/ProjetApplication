import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useMemo,useState } from 'react'
import { RadioGroup } from 'react-native-radio-buttons-group';






const RadioButtons=()=>{
    const radioButtons = useMemo(() => ([
    
    
    {
    
        id: '1', // acts as primary key, should be unique and non-empty string
        label: '2vs2',
        value: 'option1'
        
    },
    {
        id: '2',
        label: '3vs3',
        value: 'option2'
    },
    {id: '3',
    label: '5vs5',
    value: 'option3'
}]),[])
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
export default RadioButtons

const styles = StyleSheet.create({

})