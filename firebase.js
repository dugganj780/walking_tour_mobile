import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBZUcux-IH-uV8sV0EV9Bw_hQOBXUDByzI",
  authDomain: "walking-tour-app-3c954.firebaseapp.com",
  databaseURL: "https://walking-tour-app-3c954-default-rtdb.firebaseio.com/",
  projectId: "walking-tour-app-3c954",
  storageBucket: "walking-tour-app-3c954.appspot.com",
  messagingSenderId: "984413030938",
  appId: "1:984413030938:web:22600dbcbd050875399fa3",
  measurementId: "G-RBFSSCJ04F",
});

console.log(app.apiKey);

export const auth = app.auth();
export const db = firebase.database();
export const storage = getStorage(app);
export default app;
