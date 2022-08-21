import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db2 } from "../firebase";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
import { CSVLink} from 'react-csv';
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Container, Button } from "react-bootstrap";
import styled from "styled-components";
import Footer from './Footer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';


const MySwal = withReactContent(Swal)

const Show = () => {

  const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end; 
`
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end; 
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items:center;
    justify-content: space-between;
    background-color: teal;
`


  //1 - configuramos los hooks
  const [vigiladores, setvigiladores] = useState( [] )

  //2 - referenciamos a la db2 firestore
  const vigiladoresCollection = collection(db2, "vigiladores")
  

  //3 - Funcion para mostrar TODOS los docs
  const getvigiladores = async ()   => {
   const data = await getDocs(vigiladoresCollection)
   console.log(data.docs)
   setvigiladores(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   //console.log(vigiladores)
  }
  //4 - Funcion para eliminar un doc
  const deletevigilador = async (id) => {
   const vigiladorDoc = doc(db2, "vigiladores", id)
   await deleteDoc(vigiladorDoc)
   getvigiladores()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el vigilador?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deletevigilador(id)               
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })    
  }
  //6 - usamos useEffect
  useEffect( () => {
    getvigiladores()
    // eslint-disable-next-line
  }, [] )

  //7 - devolvemos vista de nuestro componente
  return (
    <>
    <div>
    <Container>
          <Navbar />     
    </Container>
    </div>
    <h1 align="center">Listado de vigiladores</h1>
    <div className='container'>
      <Right>
        <CSVLink  data={ vigiladores} filename="Planilla"  className="btn btn-success mb-3">Exportar</CSVLink>
      </Right>
      <Left>
            
      </Left>
      <div className='row'>
        <div className='col'>
          <table className='table' style={{border:"1px", minHeight:"100%"}}>
            <thead class="table-dark">
              <tr align="center">
                <th style={{ backgroundColor:"teal"}}>Nombre-Apellido</th>
                <th style={{ backgroundColor:"teal"}}>Horario</th>
                <th style={{ backgroundColor:"teal"}}>Cantidad de horas</th>
                <th style={{ backgroundColor:"teal"}}>Objetivo</th>
                <th style={{ backgroundColor:"teal"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              { vigiladores.map( (vigilador) => (
                console.log(vigilador),
                <tr align="center" key={vigilador.id}>
                  <td>{vigilador.nombre_apellido}</td>
                  <td>{vigilador.horario}</td>
                  <td>{vigilador.cantidad_horas}</td>
                  <td>{vigilador.objetivo}</td>
                  <td>
                    <Link to={`/edit/${vigilador.id}`} className="btn btn-secondary"><EditIcon>Modificar</EditIcon></Link>
                    <button onClick={ () => { confirmDelete(vigilador.id) } } className="btn btn-danger"><DeleteIcon>Eliminar</DeleteIcon></button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
        </div>
      </div>
     
    </div>  
    </>
  )
}

export default Show