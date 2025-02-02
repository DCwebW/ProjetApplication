import React from 'react'
import { addDoc, collection } from 'firebase/firestore'

export default async function EnvoiMatchDB({user, userID, date,heure,terrain,terrainId, checked}) {

    if (!user || !checked || !date || !terrain  || !heure) {
        console.error('Un ou plusieurs champs sont manquants.');
        return;
    }
    if(!terrainId){
        console.error("L'id du terrain est manquant")
        return
    }

        try{
            if(checked && date && terrain && heure){
         await addDoc(collection(db, 'matchs'),{
            useruid: userID,
            date: date,
            heure: heure,
            terrain: terrain,
            terrainId: terrainId,
            typematch: checked
         })
            }
        }
        catch(error){
    console.log('Echec envoi du match', error)
  }
    }
  

