import './App.css';
import { Routes, Route} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from './pages/ForgotPassword';
import Show from './pages/Show';
import ShowUser from './pages/ShowUser';
import Create from './pages/Create';
import Edit from './pages/Edit';
import ShowObjetivos from './pages/ShowObjetivos';
import UploadImagen from './pages/UploadImagen';


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
              <Route path = "/show-user" element={
                <ProtectedRoute>
                  <ShowUser/>
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
