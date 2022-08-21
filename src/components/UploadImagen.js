import { React, useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
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

const UploadImagen = () => {
  const { logOut, user } = useUserAuth();
  const { table, user2 } = useUserAuth();
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
  return (
    <>
    <body style={{height: "100vh"}}>
      <Container style={{ width: "400px" }}>
        <div className="p-4 box mt-3 text-center">
            <Avatar src={imageUrls} sx={{ width: 150, height: 150 }} class="center" />
        </div>
        <div> 
          <input
              type="file" 
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
        </div>
    
        <div className="p-4 box mt-3 text-center">
          <button onClick={uploadFile}> Subir imagen</button>
          {imageUrls.map((url) => {
            //return <img src={url} style={{width:"150px", height:"150px"}} />;
          })}
        </div>
        
      </Container>
    </body>
    
    </>
  );
};

export default UploadImagen;