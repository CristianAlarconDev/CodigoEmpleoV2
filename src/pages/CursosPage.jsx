import React, { useEffect, useState } from 'react'
import CursoCard from '../components/CursoCard';
import SearchBar from '../components/SearchBar';
import CursosFiltros from '../components/CursosFiltros';
import { useCursosFilters } from '../hooks/useCursosFilters';
import { usePaginacion } from '../hooks/usePaginacion'
import { CursosProvider, useCursosContext } from '../context/CursosContext';


const CursosPage = () => {

  const{cursos,obtenerCursos} = useCursosContext();
  const [cargando, setCargando]=useState(true);
  
  useEffect(()=>{
  obtenerCursos().then(
    setCargando(false))
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [] );
  const { filtros, handleFilterChange, cursosFiltrados } = useCursosFilters(cursos);
  const { datosPaginados: cursosParaMostrar, paginaActual, totalPaginas, irALaPagina }= usePaginacion(cursosFiltrados, 10, filtros);


return (
  <div>
    <div className="lg:col-span-1">
            <CursosFiltros filtrosSeleccionados={filtros} onFiltroChange={handleFilterChange}/>
    </div>
    <div className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      {cargando ? (
        // Estado de carga
        <p className="text-center text-xl text-gray-600">Buscando cursos...</p>
      ) : (
        // Grid de tarjetas usando las clases de Tailwind
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cursosFiltrados.map((item) => (
            <div key={item.id}>
              <CursoCard unCurso={item} />
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default CursosPage