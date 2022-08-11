// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxKv6NCC2lywr12ywYqzQ_USO7Qcva8Gk",
  authDomain: "security-app-2a58b.firebaseapp.com",
  projectId: "security-app-2a58b",
  storageBucket: "security-app-2a58b.appspot.com",
  messagingSenderId: "282339796951",
  appId: "1:282339796951:web:5482f5558530348fc08d92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const db2 = getFirestore(app);
export default app;
