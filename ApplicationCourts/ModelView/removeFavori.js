import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const removeFavori = async (db, userId, terrainId, setButtonPressed) => {
  const terrainsfavorisRef = collection(db, "terrainsfavoris");
  const terrainsQuery = query(terrainsfavorisRef, where('idUtilisateur', '==', userId));

  try {
    const snapshot = await getDocs(terrainsQuery);

    if (!snapshot.empty) {
      const docId = snapshot.docs[0].id;
      const terrainsfavorisData = snapshot.docs[0].data();
      const updatedTerrains = (terrainsfavorisData.terrains || []).filter(t => t !== terrainId);

      const newTerrainsFavorisData = { terrains: updatedTerrains };
      const reference = doc(db, 'terrainsfavoris', docId);
      await updateDoc(reference, newTerrainsFavorisData);

      setButtonPressed(false);
      console.log('Terrain retiré des favoris');
    }
  } catch (error) {
    console.log('Échec : Terrain non retiré des favoris', error);
  }
};

export default removeFavori;
