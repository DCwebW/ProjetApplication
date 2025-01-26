import React,{useEffect} from 'react'
import { updateDoc, doc, collection, where,getDocs, query } from 'firebase/firestore'
import * as Notifications from 'expo-notifications'
import { db } from '../ConfigFirebase2'
import { getAuth, onAuthStateChanged} from 'firebase/auth';
const  abonnementTerrainButton = async ({Id_terrain}) => {

  const auth = getAuth()

   const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
      return () => unsubscribe();
    }, [])

async function abonnementTerrain (){
  
  const token = (await Notifications.getExpoPushTokenAsync({projectId: 'd9038241-dbd4-4344-af14-d641b9471a19'})).data

  const specificDocRef = doc(db, 'terrains', Id_terrain)

  if(token !== undefined){
    
  }
    }
    
  return (
    <div>abonnementTerrain</div>
  )
}

export default abonnementTerrainButton