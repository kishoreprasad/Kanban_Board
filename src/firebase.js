import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { createStore, combineReducers, compose } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore

const firebaseConfig = {
  apiKey: "AIzaSyBWq64hiBm3YNaDF0oSFUtdS22MkCWNkTA",
  authDomain: "mx-kanban-75d0d.firebaseapp.com",
  projectId: "mx-kanban-75d0d",
  storageBucket: "mx-kanban-75d0d.appspot.com",
  messagingSenderId: "127487761110",
  appId: "1:127487761110:web:6735a476acc7f077180777",
  measurementId: "G-F5MVCNBWPM",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default function SomeComponent() {
  useFirestoreConnect([
    { collection: "todos" }, // or 'todos'
  ]);
  const todos = useSelector((state) => state.firestore.ordered.todos);
}
