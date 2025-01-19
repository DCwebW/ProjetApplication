import { collection, getDocs } from "firebase/firestore";

/**
 * Récupère les terrains depuis Firestore
 * @param {object} db - Instance de Firestore
 * @returns {Promise<Array>} - Tableau des terrains
 */
const fetchTerrains = async (db) => {
  const terrainsRef = collection(db, 'terrains');
  try {
    const querySnapshot = await getDocs(terrainsRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Erreur dans la récolte de données', error);
    throw error; // Renvoyer l'erreur pour qu'elle puisse être gérée ailleurs
  }
};

export default fetchTerrains;
