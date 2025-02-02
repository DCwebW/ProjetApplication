/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */



const functions = require("firebase-functions/v1")
const admin = require("firebase-admin")
const Expo = require('expo-server-sdk').Expo


admin.initializeApp() // Initialisation des services Firebase

const expo = new Expo() // Instanciation d'un objet Expo pour envoyer des notifications

exports.sendNotificationsOnMatchCreation = functions.firestore
    .document("matchs/{matchId}") // functions.firestore.document , ici est utilisé pour déclencher une fonction lorsqu'un document est ajouté dans la collection matchs
    .onCreate(async (snap, context) => {
        // onCreate déclenche uniquement à la création d'un nouveau match
        const matchData = snap.data()
        const terrainId = matchData.terrainId

        try {
            console.log(terrainId)
            //Ci dessous on récupère les abonnées du terrain
            const terrainDoc = await admin.firestore().doc(`terrains/${terrainId}`).get()
           
            const terrainData = terrainDoc.data()
            console.log(terrainData)

            if (!terrainData || !Array.isArray(terrainData.terrains_abonnements)) {
                console.log("Aucun abonné ou terrain_abonnements n'est pas un tableau")
                return
            }
            const abonnements = terrainData.terrains_abonnements

            //Messages de notification
            const messages = abonnements
                .filter((abonnement) => Expo.isExpoPushToken(abonnement.token)) // Ici on vérifie les token expo
                .map((abonnement) => ({
                    to: abonnement.token,
                    sound: "default",
                    title: "Nouveau Match Organisé",
                    body: `Un nouveau match a été organisé sur le terrain ${terrainData.name}`,
                    data: { terrainId, matchId: context.params.matchId }
                }))

            const chunks = expo.chunkPushNotifications(messages)
            // Ici on divise les notifications en petits groupes (Expo limite le nombre de requêtes en une seule fois)
            for (const chunk of chunks) {
                try {
                    const receipt = await expo.sendPushNotificationsAsync(chunk)
                    // Envoie les notifications
                    console.log("Notifications envoyées:", receipt)
                } catch (error) {
                    console.error("Erreur d'envoi de notifications:", error);
                }
            }

        } catch (error) {

            console.error("Erreur dans la Cloud Function:", error);
        }

    })  
