import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvOTaaA85Y-QJPrxEFIEnFqBHO_VlI_9k",
  authDomain: "pruebatecnicaacageek.firebaseapp.com",
  projectId: "pruebatecnicaacageek",
  storageBucket: "pruebatecnicaacageek.appspot.com",
  messagingSenderId: "642762371745",
  appId: "1:642762371745:web:612d25f2285215a59776e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();
const db = getFirestore()

export {
  app,
  google,
  db
}