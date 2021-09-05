import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "travel-log-d42da.firebaseapp.com",
  projectId: "travel-log-d42da",
  storageBucket: "travel-log-d42da.appspot.com",
  messagingSenderId: "879825763707",
  appId: "1:879825763707:web:30cc7dc4661b12b2e791de",
  measurementId: "G-FG5QRFHM58",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
