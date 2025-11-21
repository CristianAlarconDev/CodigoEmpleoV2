import React from 'react'
import { useState } from 'react'
import EmpleosList from '../components/EmpleosList.jsx';
import Filters from '../components/Filters.jsx';
import { useFetch } from '../hooks/useFetch.js';
const EmpleosPage = () => {
  
    const [filtros, setFiltros]=useState({
    seniority: 'todos', remoto: false,hibrido: false,presencial: false});
    /*Se llevo la logica de fetch a un hook useEmpleos; aca se intenta tener los empleos como json junto al
    estado cargando */
    const {empleos, cargando}=useFetch(import.meta.env.VITE_MOCKAPI_ENDPOINT_EMPLEOS);
    
    const handleFilterChange=(event)=>{
      const target=event.target;
      const name = target.name;
      //const value=target.value;
      const valor = target.type === 'checkbox' ? target.checked : target.value;
      //console.log("se llego aca con value: " + value)
      //setFiltros(value)
      setFiltros(prevFiltros => ({
        ...prevFiltros, 
        [name]: valor    
    }));

    }
    const empleosFiltrados = empleos.filter((empleo)=>{

    const pasaSeniority = (filtros.seniority === 'todos') || 
                          (empleo.seniority.toLowerCase() === filtros.seniority.toLowerCase());
    if (!pasaSeniority) return false;
    const { remoto, hibrido, presencial } = filtros;
    const ningunaTildada = !remoto && !hibrido && !presencial;
    if (ningunaTildada) {
        return true; 
    }
    const modalidadEmpleo = empleo.modalidad.toLowerCase().replace('í', 'i');
    if (filtros.remoto && modalidadEmpleo === 'remoto') return true;
    if (filtros.hibrido && modalidadEmpleo === 'hibrido') return true;
    if (filtros.presencial && modalidadEmpleo === 'presencial') return true;
    return false;
    })
    

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Empleos 
      </h2>
      {/*Cont principal para disposicion desktop o mobile, cambiar o llevar a css propio */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
        <div className="lg:col-span-1">
        <Filters filtrosSeleccionados={filtros} onFiltroChange={handleFilterChange}/>
      </div>
      <div className="lg:col-span-3">
        {cargando? (<p>Buscando empleos...</p>):(<EmpleosList listaEmpleos={empleosFiltrados} />
        )}
      </div>
      </div>
      
    </div>
  )
}

export default EmpleosPage