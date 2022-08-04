import './App.css';
import { Routes, Route} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Login from "./components/Login";
import Signup from "./components/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from './components/ForgotPassword';


function App() {
  return (
    <Container style={{ width: "400px" }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path = "/home" element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute> } />
              <Route path = "/" element={<Login />} />
              <Route path = "/signup" element={<Signup />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
