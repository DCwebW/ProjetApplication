import React from 'react'
import { addDoc, collection } from 'firebase/firestore'

export default async function EnvoiMatchDB({user, userID, date,heure,terrain, checked}) {

    if (!user || !checked || !date || !terrain || !heure) {
        console.error('Un ou plusieurs champs sont manquants.');
        return;
    }

        try{
            if(checked && date && terrain && heure){
         await addDoc(collection(db, 'matchs'),{
            useruid: userID,
            date: date,
            heure: heure,
            terrain: terrain,
            typematch: checked
         })
            }
        }
        catch(error){
    console.log('Echec envoi du match', error)
  }
    }
  

