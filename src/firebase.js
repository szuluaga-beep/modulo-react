
import firebase, { initializeApp } from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
     apiKey: "AIzaSyDgNCO2wqNrGIaGx3q9o5Glp-wp6cgxBOM",
     authDomain: "todo-app-b48be.firebaseapp.com",
     projectId: "todo-app-b48be",
     storageBucket: "todo-app-b48be.appspot.com",
     messagingSenderId: "928984842783",
     appId: "1:928984842783:web:a0b4f0459e853d72d30b2a"
};

export const firebaseApp = initializeApp(firebaseConfig)