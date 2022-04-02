// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9yMo26mS74-FtMA6rkQ6rbqraL1X-jxM",
  authDomain: "react-ex-w3.firebaseapp.com",
  projectId: "react-ex-w3",
  storageBucket: "react-ex-w3.appspot.com",
  messagingSenderId: "582074057489",
  appId: "1:582074057489:web:0cddad3f292f0c861182b0",
  measurementId: "G-ZBYHD7EW4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);;
const auth = getAuth(app);

export {auth}


