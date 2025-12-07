import React, { useState, useEffect } from 'react';
import EmpleosList from '../components/EmpleosList.jsx';
import Filters from '../components/Filters.jsx';
import Paginador from '../components/Paginador';
import { useFetch } from '../hooks/useFetch.js';
import { useEmpleosFilters } from '../hooks/useEmpleosFilters.jsx';
const EmpleosPage = () => {
  
    const {data:empleos, cargando}=useFetch(import.meta.env.VITE_MOCKAPI_ENDPOINT_EMPLEOS);
  
    const { filtros, handleFilterChange, empleosFiltrados } = useEmpleosFilters(empleos);

    const ITEMS_POR_PAGINA = 10;
    const PRIMERA_PAGINA=1;
    const [paginaActual, setPaginaActual] = useState(PRIMERA_PAGINA);

    /*Hace de watcher, cuando filtros cambio se va a la pagina 1 */
    useEffect(() => {
        setPaginaActual(1);
    }, [filtros]);

    const indiceFinal = paginaActual * ITEMS_POR_PAGINA; 
    const indiceInicial = indiceFinal - ITEMS_POR_PAGINA;
    const empleosParaMostrar = empleosFiltrados.slice(indiceInicial, indiceFinal);
    const totalPaginas = Math.ceil(empleosFiltrados.length / ITEMS_POR_PAGINA);

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
        {cargando? (<p>Buscando empleos...</p>):(<EmpleosList listaEmpleos={empleosParaMostrar} />
        )}
        <Paginador paginaActual={paginaActual} totalPaginas={totalPaginas} onChangePagina={setPaginaActual}/>
      </div>
      </div>
      
    </div>
  )
}

export default EmpleosPage