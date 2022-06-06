import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import rootReducer from "./store/reducers/rootReducer";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { BrowserRouter } from "react-router-dom";

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
firebase.firestore();

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};
const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
console.log(store.getState());
