import React from 'react'
import { useState, useEffect } from 'react'
import EmpleosList from '../components/EmpleosList.jsx';
import Filters from '../components/Filters.jsx';
const EmpleosPage = () => {
    const [empleos, setEmpleos]=useState([]);
    const [cargando, setCargando]=useState(true);
    /*state para los filtros */
    const [filtro, setFiltros]=useState('todos');

    const handleFilterChange=(event)=>{
      const target=event.target;
      //const name = target.name;
      const value=target.value;
      console.log("se llego aca con value: " + value)
      setFiltros(value)

    }
    const empleosFiltrados = empleos.filter((empleo)=>{
      if(filtro==='todos'){
        return true
      }
      console.log("se llego aca con valor de filtro :" + filtro)
      return empleo.seniority.toLowerCase()===filtro.toLowerCase();
    })
    
    const mockApi= "https://68ee91ccdf2025af78042146.mockapi.io/recursos/empleos" ;
    
    async function fetchMockApi(url){
      let data= [];
      try {
        const response = await fetch(url);
        
        if(!response.ok){
          throw new Error(`Ocurrió el error: ${response.status}`);
        }
        data =await response.json();
        
      } catch (error) {
        console.error(error);
      }
      return data;
    }

    useEffect(()=>{
      const cargarEmpleos =async ()=>{
        try {
          const empleosData =await fetchMockApi(mockApi);
          console.log("esto es el fetch :", empleosData)
          setEmpleos(empleosData);
        } catch (error) {
          console.error("Error al cargar empleos:", error);
        }
        finally{
          setCargando(false);
        }
        
      }
      cargarEmpleos();
      
    },
    /*dependencias: ninguna por ahora, solo se deberia ejecutar una vez */
    [] );
    /*test empleos en array */
    //console.log(empleos)


  return (
    <div><h2>Empleos Page</h2>
    <Filters seniorityActual={filtro} onSeniorityChange={handleFilterChange}/>
    {cargando? (<p>Buscando empleos...</p>):(<EmpleosList listaEmpleos={empleosFiltrados} />
    )}
    </div>
  )
}

export default EmpleosPage