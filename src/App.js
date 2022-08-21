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
import Show from './components/Show';
import Create from './components/Create';
import Edit from './components/Edit';
import ShowObjetivos from './components/ShowObjetivos';
import UploadImagen from './components/UploadImagen';


function App() {
  return (
    <Container style={{width:"1400px"}}>
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
              <Route path = "/show" element={
                <ProtectedRoute>
                  <Show/>
                </ProtectedRoute> } />
              <Route path = "/create" element={
                <ProtectedRoute>
                  <Create/>
                </ProtectedRoute> } />  
              <Route path = "/edit/:id" element={
                <ProtectedRoute>
                  <Edit/>
                </ProtectedRoute> } />  
              <Route path = "/show-objetivos" element={
                <ProtectedRoute>
                  <ShowObjetivos/>
                </ProtectedRoute> } />
              <Route path = "/upload-imagen" element={
                  <ProtectedRoute>
                    <UploadImagen/>
                  </ProtectedRoute> } />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
