import React from 'react'
import { useState, useEffect } from 'react'

const EmpleosPage = () => {
    const [empleos, setEmpleos]=useState([]);

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
        const empleosData =await fetchMockApi(mockApi);
        setEmpleos(empleosData);
      }
      cargarEmpleos();
    },
    /*dependencias: ninguna por ahora, solo se deberia ejecutar una vez */
    [] )
    /*test empleos en array */
    //console.log(empleos)


  return (
    <div><h2>Empleos Page</h2>
    <pre>
      {JSON.stringify(empleos, null, 6)}
    </pre>
    </div>
  )
}

export default EmpleosPage