
import EmpleosList from '../components/EmpleosList.jsx';
import Filters from '../components/Filters.jsx';
import Paginador from '../components/Paginador';
import { useFetch } from '../hooks/useFetch.js';
import { useEmpleosFilters } from '../hooks/useEmpleosFilters.jsx';
import { usePaginacion } from '../hooks/usePaginacion.js';
const EmpleosPage = () => {
  
    const {data:empleos, cargando}=useFetch(import.meta.env.VITE_MOCKAPI_ENDPOINT_EMPLEOS);
  
    const { filtros, handleFilterChange, empleosFiltrados } = useEmpleosFilters(empleos);

    const { datosPaginados:empleosParaMostrar, paginaActual, totalPaginas, irALaPagina } = usePaginacion(empleosFiltrados, 10);

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
        <Paginador paginaActual={paginaActual} totalPaginas={totalPaginas} onChangePagina={irALaPagina}/>
      </div>
      </div>
      
    </div>
  )
}

export default EmpleosPage