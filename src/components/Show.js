import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db2 } from "../firebase";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
import { CSVLink} from 'react-csv';

const MySwal = withReactContent(Swal)

const Show = () => {
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
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <CSVLink  data={ vigiladores} filename="Planilla"  className="btn btn-success mb-3">Export</CSVLink>
          <table className='table' style={{border:"1px", position:"relative", minHeight:"100%"}}>
            <thead class="table-dark">
              <tr>
                <th>Nombre-Apellido</th>
                <th>Horario</th>
                <th>Cantidad de horas</th>
                <th>Objetivo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { vigiladores.map( (vigilador) => (
                console.log(vigilador),
                <tr key={vigilador.id}>
                  <td>{vigilador.nombre_apellido}</td>
                  <td>{vigilador.horario}</td>
                  <td>{vigilador.cantidad_horas}</td>
                  <td>{vigilador.objetivo}</td>
                  <td>
                    <Link to={`/edit/${vigilador.id}`} className="btn btn-light"><i className="fa-solid fa-pencil">Modificar</i></Link>
                    <button onClick={ () => { confirmDelete(vigilador.id) } } className="btn btn-danger"><i className="fa-solid fa-trash">Eliminar</i></button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
          <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-primary'>Create</Link>    
         </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Show