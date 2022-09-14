import { React, useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, setDoc } from "firebase/firestore";
import { auth } from "../firebase";
import Avatar from "@mui/material/Avatar";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

const db = getFirestore();

const Home = () => {
  const { logOut, user, setUser } = useUserAuth();
  const { table, user2 } = useUserAuth();
  const [userFinal, setUserFinal] = useState(null);
  const navigate = useNavigate();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);


  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTable = async () => {
    try {
      await table;
      navigate("/show");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleTableUser = async () => {
    try {
      await table;
      navigate("/show-user");
    } catch (error) {
      console.log(error.message);
    }
  };

  async function getRol(uid) {
    const docuRef = doc(db, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;

    console.log(infoFinal)
    
      const userData = {
        uid: user.uid,
        email: user.email,
        rol: infoFinal,
      };
      setUser(userData);
      console.log("userData fianl", userData);
    return infoFinal;
  }


  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUserFinal(userData);
      console.log("userData fianl", userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final

      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUserFinal(null);
    }
  });

  return (
    <>
    <body style={{height: "100vh"}}>
      <Container style={{ width: "400px" }}>
        <div className="p-4 box mt-3 text-center">
          Bienvenido <br />
          {user && user.email}
        </div>
        <div className="d-grid gap-2">
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
        {user.rol === "admin" ?  <div className="p-4 box mt-3 text-center">
          <Button variant="primary" onClick={handleTable}>
          Ver planilla
          </Button>
        </div>: 
        <div className="p-4 box mt-3 text-center">
          No tiene Permiso para visualizar la plantilla de Admin
          <br></br>
          <Button variant="primary" onClick={handleTableUser}>
          Ver planilla
          </Button>
        </div>}
        
      </Container>
    </body>
    
    </>
  );
};

export default Home;