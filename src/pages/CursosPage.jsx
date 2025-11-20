import React, { useEffect, useState } from 'react'
import CursoCard from '../components/CursoCard';


const CursosPage = () => {

  const [cursos, setCursos]=useState([]);
  const [cargando, setCargando]=useState(true);

  const mockApiCursos= "https://68ee91ccdf2025af78042146.mockapi.io/recursos/cursos" ;

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
    const cargarCursos =async ()=>{
      try {
        const cursosData =await fetchMockApi(mockApiCursos);
        console.log("esto es el fetch :", cursosData)
        setCursos(cursosData);
      } catch (error) {
        console.error("Error al cargar cursos:", error);
      }
      finally{
        setCargando(false);
      }
      
    }
    cargarCursos();
    
  },
  [] );


return (
    <div className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      {cargando ? (
        // Estado de carga
        <p className="text-center text-xl text-gray-600">Buscando cursos...</p>
      ) : (
        // Grid de tarjetas usando las clases de Tailwind
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cursos.map((item) => (
            <div key={item.id}>
              <CursoCard unCurso={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CursosPage