import EmpleosList from '../components/EmpleosList.jsx';
import Filters from '../components/Filters.jsx';
import Paginador from '../components/Paginador';
import SearchBar from '../components/SearchBar';
import { useFetch } from '../hooks/useFetch.js';
import { useEmpleosFilters } from '../hooks/useEmpleosFilters.js';
import { usePaginacion } from '../hooks/usePaginacion.js';
const EmpleosPage = () => {
  
    const {data:empleos, cargando}=useFetch(import.meta.env.VITE_MOCKAPI_ENDPOINT_EMPLEOS);
  
    const { filtros, handleFilterChange, empleosFiltrados } = useEmpleosFilters(empleos);

    const { datosPaginados:empleosParaMostrar, paginaActual, totalPaginas, irALaPagina } = usePaginacion(empleosFiltrados, 10, filtros);

    return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Empleos 
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Búsqueda</h3>
        <SearchBar valorBusqueda={filtros.busqueda} onSearchChange={handleFilterChange} 
        placeholderString={"Buscar por puesto o empresa..."} />
      </div>

      {/*Cont principal para disposicion desktop o mobile, cambiar o llevar a css propio */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
        <div className="lg:col-span-1">
        <Filters filtrosSeleccionados={filtros} onFiltroChange={handleFilterChange}/>
        </div>
        
      <div className="lg:col-span-3">
        {cargando? (<p>Buscando empleos...</p>):(<EmpleosList listaEmpleos={empleosParaMostrar} />
        )}
      </div>
      </div>
      <div className='mt-8 flex justify-center'>
          <Paginador paginaActual={paginaActual} totalPaginas={totalPaginas} onChangePagina={irALaPagina}/>
      </div>
    </div>
  )
}

export default EmpleosPage