/* eslint-disable no-undef */
import firebase from "firebase";
// Configuration for lego leaders (ADD)

const environment = process.env.REACT_APP_ENV || "development";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const devFirebaseConfig = {
  apiKey: "AIzaSyBSjU-Y7j3d3SJ0tQwDL26xLftVazeUXjA",
  authDomain: "chronos-react.firebaseapp.com",
  projectId: "chronos-react",
  storageBucket: "chronos-react.appspot.com",
  messagingSenderId: "217691302099",
  appId: "1:217691302099:web:cfe6a1772d46708cbdcc26",
  measurementId: "G-Z9VM37BE3Y",
};

// Prod Firebase Config
const prodFirebaseConfig = {
  apiKey: "AIzaSyChZ092eyqvnVkGLYKX9LzzA4M_dLEwsb8",
  authDomain: "chronos-app-prod.firebaseapp.com",
  projectId: "chronos-app-prod",
  storageBucket: "chronos-app-prod.appspot.com",
  messagingSenderId: "510369198881",
  appId: "1:510369198881:web:1b537e2300da19e3388460",
};

const getFirebaseConfig = () => {
  switch (environment) {
    case "local":
    // return devFirebaseConfig;
    case "development":
    // Commented because dev BE is using Prod firebase config
    // return devFirebaseConfig;
    case "production":
      return prodFirebaseConfig;
    default:
      return prodFirebaseConfig;
  }
};

// Initialize Firebase
firebase.initializeApp(getFirebaseConfig());
firebase.analytics();

export default firebase;
