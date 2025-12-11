import CursoCard from '../components/CursoCard';
import SearchBar from '../components/SearchBar';
import CursosFiltros from '../components/CursosFiltros';
import Paginador from '../components/Paginador';
import { useCursos } from '../hooks/useCursos.js';


const CursosPage = () => {
  const { cursos, meta, cargando, busqueda, filtros, acciones } = useCursos();

return (
  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Cursos
    </h2>
    {/*aca va el nuevo div */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <div className="lg:col-span-1">
      <CursosFiltros filtrosSeleccionados={filtros} onFiltroChange={acciones.filtrar}/>
    </div>
    <div className="lg:col-span-3">
      <div className='mb-6'>
        <SearchBar valorBusqueda={busqueda} onSearchChange={(e) => acciones.buscar(e.target.value)} 
        placeholderString="Buscar por título, autor o tecnología..." />
      </div>
      {cargando ? (
        // Estado de carga
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-gray-500 animate-pulse">Buscando cursos...</p>
        </div>
      ) : (
        // Grid de tarjetas usando las clases de Tailwind
        <>
        <div className="mb-4">
          <p className="text-sm text-gray-500">
              Se encontraron <span className="font-bold text-gray-800">{meta.total}</span> cursos
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((item) => (
            <div key={item._id}>
              <CursoCard unCurso={item} />
            </div>
          ))}
        </div>
        </>
      )}
    </div>
    </div>
    {!cargando && meta.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Paginador paginaActual={meta.page} totalPaginas={meta.totalPages} onChangePagina={acciones.cambiarPagina}/>
        </div>
      )}
    </div>
  );
};

export default CursosPage