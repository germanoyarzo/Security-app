import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db2 } from "../firebase";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const ShowObjetivos = () => {
  //1 - configuramos los hooks
  const [objetivos, setObjetivos] = useState( [] )

  //2 - referenciamos a la db2 firestore
  const objetivosCollection = collection(db2, "objetivos")

  //3 - Funcion para mostrar TODOS los docs
  const getobjetivos = async ()   => {
   const data = await getDocs(objetivosCollection)
   console.log(data.docs)
   setObjetivos(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   //console.log(objetivos)
  }
  //4 - Funcion para eliminar un doc
  const deleteobjetivo = async (id) => {
   const objetivoDoc = doc(db2, "objetivos", id)
   await deleteDoc(objetivoDoc)
   getobjetivos()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el objetivo?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteobjetivo(id)               
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
    getobjetivos()
    // eslint-disable-next-line
  }, [] )

  //7 - devolvemos vista de nuestro componente
  return (
    <>
    <div className='container' >
      <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-primary'>Create</Link>    
      </div>
      <div className='row'>
        <div className='col'>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Localidad</th>
                <th>Descripcion</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { objetivos.map( (objetivo) => (
                console.log(objetivo),
                <tr key={objetivo.id}>
                  <td>{objetivo.localidad}</td>
                  <td>{objetivo.descripcion}</td>
                  <td>
                    <Link to={`/edit/${objetivo.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={ () => { confirmDelete(objetivo.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
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

export default ShowObjetivos