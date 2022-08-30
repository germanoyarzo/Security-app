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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';
const MySwal = withReactContent(Swal)

const Table = ({ data }) => {
     //1 - configuramos los hooks
  const [vigiladores, setvigiladores] = useState( [] )
  const [tablaVigiladores, setTablaVigiladores]= useState([]);
  //2 - referenciamos a la db2 firestore
  const vigiladoresCollection = collection(db2, "vigiladores")

  const [busqueda, setBusqueda]= useState("");
  

  //3 - Funcion para mostrar TODOS los docs
  const getvigiladores = async ()   => {
   const data = await getDocs(vigiladoresCollection)
   //console.log(data.docs)
   setvigiladores(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   setTablaVigiladores(data.docs.map( (doc) => ( {...doc.data(),id:doc.id})));
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
  
  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaVigiladores.filter((elemento)=>{
      if(elemento.nombre_apellido.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.cantidad_horas.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    });
    setvigiladores(resultadosBusqueda);
  }
  //6 - usamos useEffect
  useEffect( () => {
    getvigiladores()
    // eslint-disable-next-line
  }, [] )
 
    return (
        <div className="Table">
        <div className="containerInput">
          <input
            className="form-control inputBuscar mb-3"
            value={busqueda}
            placeholder="Búsqueda por Nombre o Apellido"
            onChange={handleChange}
          />
        </div>
        <div className='row'>
        <div className='col'>
          <table className='table' style={{border:"1px", minHeight:"100%"}}>
            <thead class="table-dark">
              <tr align="center">
                <th style={{ backgroundColor:"teal"}}>Nombre-Apellido</th>
                <th style={{ backgroundColor:"teal"}}>Hora Inicio</th>
                <th style={{ backgroundColor:"teal"}}>Hora Finalizacion</th>
                <th style={{ backgroundColor:"teal"}}>Cantidad de horas</th>
                <th style={{ backgroundColor:"teal"}}>Objetivo</th>
                <th style={{ backgroundColor:"teal"}}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {vigiladores.map( (vigilador) => (
                console.log(vigilador),
                <tr align="center" key={vigilador.id}>
                  <td>{vigilador.nombre_apellido}</td>
                  <td>{vigilador.inicio}</td>
                  <td>{vigilador.finalizacion}</td>
                  <td>{vigilador.cantidad_horas}</td>
                  <td>{vigilador.objetivo}</td>
                  <td>
                    <Link to={`/edit/${vigilador.id}`} className="btn btn-outline-secondary"><EditIcon>Modificar</EditIcon></Link>
                    <button onClick={ () => { confirmDelete(vigilador.id) } } className="btn btn-outline-danger"><DeleteIcon>Eliminar</DeleteIcon></button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
        </div>
        </div>
        </div>
    );
  };
  
  export default Table;