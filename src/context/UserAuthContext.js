import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase";
import { getFirestore, doc, getDoc, collection, setDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const db = getFirestore();

  async function logIn(email, password,rol) {
    const infoUsuario= await signInWithEmailAndPassword(auth, email, password);

    console.log(infoUsuario.user.uid);
    const docuRef = doc(db,`usuarios/${infoUsuario.user.uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    console.log(infoFinal)
    
      const userData = {
        uid: infoUsuario.user.uid,
        email: infoUsuario.user.email,
        rol: infoFinal,
      };
      setUser(userData);
      console.log("userData fianl", userData);
    
    return infoUsuario
    //return signInWithEmailAndPassword(auth, email, password);
  }
  async function signUp(email, password, rol) {
    const infoUsuario= await createUserWithEmailAndPassword(auth, email, password);

    console.log(infoUsuario.user.uid);
    const docuRef = doc(db,`usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { email: email, rol: rol});
    
    return infoUsuario
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth,email);
  }
  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    })
  }

  

  async function getRol(uid) {
    const docuRef = doc(db, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    console.log(infoFinal)
    return infoFinal;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, resetPassword, forgotPassword }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
} 