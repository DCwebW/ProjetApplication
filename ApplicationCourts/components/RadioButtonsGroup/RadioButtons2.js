import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useMemo,useState } from 'react'
import { RadioGroup } from 'react-native-radio-buttons-group';






const RadioButtons2=(props)=>{
    const radioButtons = useMemo(() => ([
    { id: '1', 
        label: 'filet',
        value: 'option1'    
    },
    {id: '2',
        label: 'chaines',
        value: 'option2'
    },
    {id: '3',
    label: 'sans filet',
    value: 'option3'
    },]),[])
// Ici useMemo est utilisé pour stocker le tableau de boutons radio, qui ont chacun un id , un label et une value



const ChangeRadioButton=(radioButtons) =>{

    if(props.onRadioButtonChange){
        props.onRadioButtonChange(radioButtons)
    }
}// Cette fonction sera appelée chaque fois que la sélection de bouton radio change , 
// elle vérifie la condition pour savoir si props.onRadioButtonChange est définie
//puis appelle cette même fonction en passant le tableau en argument 


    const [selectedId, setSelectedId] = useState();
return(
    <RadioGroup 
            radioButtons={radioButtons} 
            onPress={(updatedRadioButtons) => {
                const selectedButton = updatedRadioButtons.find((button) => button.selected);
                setSelectedId(selectedButton?.id);
                ChangeRadioButton(updatedRadioButtons);
            }}
            selectedId={selectedId}
            layout='row'
            /> 
         // Ici le onPress met à jour l'état de selectedId avec id du bouton radio sélectionné
         // la méthode find() permet ici de rechercher le premier bouton pour lequel la propriété est selected et
         // mis dans selectedId
         // Ici la fonction ChangeRadioButton permet de propager le changement au composant parent    
        
)
}
export default RadioButtons2

const styles = StyleSheet.create({})