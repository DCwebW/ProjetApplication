import React from 'react'
import { TimerPickerModal } from "react-native-timer-picker";

const ModalTimePicker = ({TimePickerouvert, OuvrirTimePicker,choisirHeure}) => {
    function formatTime(hours, minutes) {
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      }
  return (
    <TimerPickerModal
              visible={TimePickerouvert}
              setIsVisible={OuvrirTimePicker}
              onConfirm={(pickedDuration) => {
    
                const { hours, minutes } = pickedDuration;
                choisirHeure(formatTime(hours, minutes))
              OuvrirTimePicker()
                console.log(`Heure choisie : ${pickedDuration.hours}:${pickedDuration.minutes} `)
              }}
              modalTitle='Heure du match'
              onCancel={OuvrirTimePicker}
              closeOnOverlayPress
              // styles={{backgroundColor:'orange'}}
              hideSeconds
    
            />
  )
}

export default ModalTimePicker
