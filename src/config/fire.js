import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC3KurzPBtfbKHaPQs0VOpPz7rtCXVeHxA",
    authDomain: "hostel-project-18e90.firebaseapp.com",
    databaseURL: "https://hostel-project-18e90.firebaseio.com",
    projectId: "hostel-project-18e90",
    storageBucket: "hostel-project-18e90.appspot.com",
    messagingSenderId: "440849346116",
    appId: "1:440849346116:web:be74a3b6eacca55acf9611",
    measurementId: "G-ZS3XXLWG1X"
};

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID,
//     measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };

//Initializing Firebase for App
firebase.initializeApp(firebaseConfig);

// if (window.location.hostname === 'localhost') {
//     console.log("testing locally -- hitting local functions and firestore emulators");
//     firebase.functions().useFunctionsEmulator('http://localhost:5001');
//     firebase.firestore().settings({
//         host: 'localhost:8080',
//         ssl: false
//     });
// }
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const functions = firebase.functions();
export const db = firebase.firestore();
export const fieldval = firebase.firestore.FieldValue;
export const timestamp = firebase.firestore.Timestamp
export default firebase;