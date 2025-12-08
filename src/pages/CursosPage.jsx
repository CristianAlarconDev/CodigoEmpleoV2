import React, { useEffect, useState } from 'react'
import CursoCard from '../components/CursoCard';
import SearchBar from '../components/SearchBar';
import CursosFiltros from '../components/CursosFiltros';
import Paginador from '../components/Paginador';
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
  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Cursos
    </h2>
    <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Búsqueda</h3>
      <SearchBar valorBusqueda={filtros.busqueda} onSearchChange={handleFilterChange} placeholderString="Buscar por título, autor o tecnología..." />
    </div>
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
          {cursosParaMostrar.map((item) => (
            <div key={item.id}>
              <CursoCard unCurso={item} />
            </div>
          ))}
        </div>
      )}
      <Paginador paginaActual={paginaActual} totalPaginas={totalPaginas} onChangePagina={irALaPagina}/>
    </div>
    </div>
  );
};

export default CursosPage