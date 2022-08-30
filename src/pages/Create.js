import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db2 } from "../firebase";

const Create = () => {
  const [ nombre, setNombre ] = useState('')
  const [ inicio, setInicio ] = useState('')
  const [ finalizacion, setFinalizacion ] = useState('')
  const [ cantidadHoras, setCantidadHoras ] = useState(0)
  const navigate = useNavigate()

  const vigiladoresCollection = collection(db2, "vigiladores")

  const store = async (e) => {
    e.preventDefault()
    await addDoc( vigiladoresCollection,{nombre_apellido: nombre, inicio: inicio, finalizacion: finalizacion, cantidad_horas:cantidadHoras} )
    navigate('/show')
    //console.log(e.target[0].value)
  }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Crear Vigilador</h1>
                 <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={ (e) => setNombre(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Hora Inicio</label>
                        <input
                            value={inicio}
                            onChange={ (e)=> setInicio(e.target.value)} 
                            type="datetime-local"
                            className='form-control'
                        />                 
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>Hora Finalización</label>
                        <input
                            value={finalizacion}
                            onChange={ (e)=> setFinalizacion(e.target.value)} 
                            type="datetime-local"
                            className='form-control'
                        />                 
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Cantidad de horas</label>
                        <input
                            value={cantidadHoras}
                            onChange={ (e)=> setCantidadHoras(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>  
                    <button type='submit' className='btn btn-primary'>Agregar</button>
                 </form>   
            </div>
        </div>
    </div> 
  )
}

export default Create