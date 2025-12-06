import React, { useEffect, useState } from 'react'
import CursoCard from '../components/CursoCard';
import { CursosProvider, useCursosContext } from '../context/CursosContext';


const CursosPage = () => {

  const{cursos,obtenerCursos} = useCursosContext();
  const [cargando, setCargando]=useState(true);
  
  useEffect(()=>{
  obtenerCursos().then(
    setCargando(false))
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