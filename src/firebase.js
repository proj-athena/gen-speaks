import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGH9uFsF3MHuz78C8X4bqGiaTHm6RKHw0",
  authDomain: "genspeaks-podcasts.firebaseapp.com",
  projectId: "genspeaks-podcasts",
  storageBucket: "genspeaks-podcasts.appspot.com",
  messagingSenderId: "436042375035",
  appId: "1:436042375035:web:9cf8718c537634f3f367de",
  measurementId: "G-M187GSMPEQ"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = getDatabase(app);
export default app;
