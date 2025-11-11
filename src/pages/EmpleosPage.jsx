import React from 'react'
import { useState, useEffect } from 'react'
import EmpleosList from '../components/EmpleosList.jsx';
import Filters from '../components/Filters.jsx';
const EmpleosPage = () => {
    const [empleos, setEmpleos]=useState([]);
    const [cargando, setCargando]=useState(true);
    
    const [filtros, setFiltros]=useState({
    seniority: 'todos', remoto: false,hibrido: false,presencial: false});

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
     /* if(filtro==='todos'){
        return true
      }
      console.log("se llego aca con valor de filtro :" + filtro)
      return empleo.seniority.toLowerCase()===filtro.toLowerCase();*/
    
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
    <Filters filtrosSeleccionados={filtros} onFiltroChange={handleFilterChange}/>
    {cargando? (<p>Buscando empleos...</p>):(<EmpleosList listaEmpleos={empleosFiltrados} />
    )}
    </div>
  )
}

export default EmpleosPage