import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db2 } from "../firebase";

const Edit = () => {
    const [ nombre, setNombre ] = useState('')
    const [ horario, setHorario ] = useState('')
    const [ cantidadHoras, setCantidadHoras ] = useState(0)

    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const vigilador = doc(db2, "vigiladores", id)
        const data = {nombre_apellido: nombre, horario: horario, cantidad_horas:cantidadHoras}
        await updateDoc(vigilador, data)
        navigate('/show')
    }

    const getvigiladorById = async (id) => {
        const vigilador = await getDoc( doc(db2, "vigiladores", id) )
        if(vigilador.exists()) {
            console.log(vigilador.data())
            setNombre(vigilador.data().nombre)
            setHorario(vigilador.data().horario)    
            setCantidadHoras(vigilador.data().cantidadHoras)
        }else{
            console.log('El vigilador no existe')
        }
    }

    useEffect( () => {
        getvigiladorById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar vigilador</h1>
                 <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre y Apellido</label>
                        <input
                            value={nombre}
                            onChange={ (e) => setNombre(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Horario</label>
                        <input
                            value={horario}
                            onChange={ (e)=> setHorario(e.target.value)} 
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
                    <button type='submit' className='btn btn-primary'>Update</button>
                 </form>   
            </div>
        </div>
    </div> 
    )
}

export default Edit