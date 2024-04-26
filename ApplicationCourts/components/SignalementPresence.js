// import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';

// const SignalementPresence = ({ nameTerrain }) => {
//   const [fcmToken, setFCMToken] = useState('');

//   useEffect(() => {
//     // Récupérer le jeton FCM lors du montage du composant
//     const fetchFCMToken = async () => {
//       const token = await getFCMToken();
//       setFCMToken(token);
//     };
//     fetchFCMToken();
//   }, []);

//   const getFCMToken = async () => {
//     try {
//       const token = await messaging().getToken();
//       return token;
//     } catch (error) {
//       console.error('Error getting FCM token:', error);
//       return null;
//     }
//   };

//   const sendFCMNotification = async () => {
//     try {
//       // Envoi de la notification à partir de votre serveur Firebase
//       // Remplacez 'YOUR_SERVER_KEY' par votre clé de serveur Firebase
//       await fetch('https://fcm.googleapis.com/fcm/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'key=YOUR_SERVER_KEY',
//         },
//         body: JSON.stringify({
//           to: fcmToken,
//           notification: {
//             title: 'Courts 📬',
//             body: `Un joueur a signalé sa présence sur le terrain ${nameTerrain}`,
//           },
//         }),
//       });
//       console.log('FCM notification sent successfully');
//     } catch (error) {
//       console.error('Error sending FCM notification:', error);
//     }
//   };

//   return (
//     <TouchableOpacity onPress={sendFCMNotification}>
//       <View style={styles.signalView}>
//         <Text>Signaler sa présence</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default SignalementPresence;

// const styles = StyleSheet.create({
//   signalView: {
//     backgroundColor: 'rgba(197, 44, 35,1)',
//     alignItems: 'center',
//     height: 40,
//     justifyContent: 'center',
//     marginTop: 35,
//     width: 200,
//     alignSelf: 'center',
//     borderRadius: 15
//   }
// });
