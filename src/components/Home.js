import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const { table, user2 } = useUserAuth();
  const navigate = useNavigate();
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
    <Container style={{ width: "400px" }}>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      <div className="p-4 box mt-3 text-center">
        <Button variant="primary" onClick={handleTable}>
         Ver planilla
        </Button>
      </div>
      </Container>
    </>
  );
};

export default Home;