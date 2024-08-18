import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firebase-firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCJ_vs2__YKy_JeEiJ2m-Hqcpa5pO8ofRE",
  authDomain: "attendance-3085e.firebaseapp.com",
  projectId: "attendance-3085e",
  storageBucket: "attendance-3085e.appspot.com",
  messagingSenderId: "431195267871",
  appId: "1:431195267871:web:9e68c67e73d3bfdab0c62a",
  measurementId: "G-3KZN7B8M4E",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// var provider = new firebase.auth.FacebookAuthProvider();
export default firebaseApp;
