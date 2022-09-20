import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDgNCO2wqNrGIaGx3q9o5Glp-wp6cgxBOM",
  authDomain: "todo-app-b48be.firebaseapp.com",
  projectId: "todo-app-b48be",
  storageBucket: "todo-app-b48be.appspot.com",
  messagingSenderId: "928984842783",
  appId: "1:928984842783:web:a0b4f0459e853d72d30b2a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getCollection = async (coll) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null,
  };
  try {
    const response = collection(db, coll);
    const data = await getDocs(response);
    const arrayData = data.docs.map((element) => ({
      id: element.id,
      ...element.data(),
    }));
    result.statusResponse = true;
    result.data = arrayData;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const addDocument = async (coll, data) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null,
  };
  try {
    const res = collection(db, coll);
    const response = await addDoc(res, data);
    result.statusResponse = true;
    result.data = { id: response.id };
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const getDocument = async (coll, id) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null,
  };
  try {
    const res = collection(db, coll, id);
    const response = await getDoc(res);
    result.data = { id: response.id, ...response.data() };
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const updateDocument = async (coll, id, data) => {
  const result = {
    statusResponse: false,
    error: null,
  };
  try {
    const res = doc(db, coll, id);
    await updateDoc(res, data);
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const deleteDocument = async (coll, id) => {
  const result = {
    statusResponse: false,
    error: null,
  };
  try {
    const res = doc(db, coll, id);
    await deleteDoc(res)
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};
