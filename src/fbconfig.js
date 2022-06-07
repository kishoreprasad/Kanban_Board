import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const config = {
  apiKey: "AIzaSyBWq64hiBm3YNaDF0oSFUtdS22MkCWNkTA",
  authDomain: "mx-kanban-75d0d.firebaseapp.com",
  projectId: "mx-kanban-75d0d",
  storageBucket: "mx-kanban-75d0d.appspot.com",
  messagingSenderId: "127487761110",
  appId: "1:127487761110:web:6735a476acc7f077180777",
  measurementId: "G-F5MVCNBWPM",
};
firebase.initializeApp(config);
const db = firebase.firestore();
export default db;
