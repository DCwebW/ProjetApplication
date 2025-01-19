import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

const ajoutFavori = async (db, userId, terrainId, setButtonPressed, setShowMessage) => {
  const terrainsfavorisRef = collection(db, "terrainsfavoris");
  const terrainsQuery = query(terrainsfavorisRef, where('idUtilisateur', '==', userId));

  try {
    const snapshot = await getDocs(terrainsQuery);

    if (snapshot.empty) {
      const nouveauTerrainFavori = {
        idUtilisateur: userId,
        terrains: [terrainId],
      };
      await addDoc(terrainsfavorisRef, nouveauTerrainFavori);
      setButtonPressed(true);
    } else {
      const docId = snapshot.docs[0].id;
      const terrainsfavorisData = snapshot.docs[0].data();
      const updatedTerrains = [...(terrainsfavorisData.terrains || []), terrainId];

      const newTerrainsFavorisData = { terrains: updatedTerrains };
      const reference = doc(db, 'terrainsfavoris', docId);
      await updateDoc(reference, newTerrainsFavorisData);
      setButtonPressed(true);
    }

    setShowMessage(true);
    console.log('Terrain mis en favori');
  } catch (error) {
    console.log('Echec : Terrain non ajouté', error);
  }
};

export default ajoutFavori;
