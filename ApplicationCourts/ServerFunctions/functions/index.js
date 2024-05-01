const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.onAddAdminMessage =
  functions.firestore.document("clients/{docID}").onCreate(
      async (snap, context) => {
        try {
          return snap.ref.set(
              {adminMessage: "Welcome to the team ! {BOT}"}, {merge: true});
        } catch (err) {
          functions.logger.error("Stuff went down : ", err);
        }
      },
  );
