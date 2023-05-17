import { initializeApp } from "firebase/app";
import getDatabase from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCAwETf2WL9S6BOw8drs3quTdeEhl2-xsA",
  authDomain: "northwest-fitness-forum.firebaseapp.com",
  projectId: "northwest-fitness-forum",
  storageBucket: "northwest-fitness-forum.appspot.com",
  messagingSenderId: "56551829986",
  appId: "1:56551829986:web:4649163ea30ca567f1c9bb",
  measurementId: "G-X2RFCYB19E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);