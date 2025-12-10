import EmpleosList from '../components/EmpleosList.jsx';
import Filters from '../components/Filters.jsx';
import Paginador from '../components/Paginador';
import SearchBar from '../components/SearchBar';
import { useEmpleos } from '../hooks/useEmpleos.js';
const EmpleosPage = () => {

    const { empleos, meta, cargando, busqueda, filtros, acciones } = useEmpleos();

    return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Empleos 
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Búsqueda</h3>
        <SearchBar valorBusqueda={busqueda} onSearchChange={(e) => acciones.buscar(e.target.value)} 
        placeholderString={"Buscar por puesto o empresa..."} />
      </div>

      {/*Cont principal para disposicion desktop o mobile, cambiar o llevar a css propio */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
        <div className="lg:col-span-1">
        <Filters filtrosSeleccionados={filtros} onFiltroChange={acciones.filtrar}/>
        </div>
        
      <div className="lg:col-span-3">
        {cargando? (<p>Buscando empleos...</p>):(
          <>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">Se encontraron <span className="font-bold text-gray-800">{meta.total}</span> resultados</p>
          </div>
          <EmpleosList listaEmpleos={empleos} />
          {empleos.length === 0 && <p className="text-center mt-10">No hay resultados.</p>}
          </>
        )}
      </div>
      </div>
      <div className='mt-8 flex justify-center'>
          <Paginador paginaActual={meta.page} totalPaginas={meta.totalPaginas} onChangePagina={acciones.cambiarPagina}/>
      </div>
    </div>
  )
}

export default EmpleosPage