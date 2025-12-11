import { useParams,Link } from "react-router-dom";
import { Award, BookOpen, Clock, User } from "lucide-react";
import { useFetch } from "../hooks/useFetch";

function CursoCardFull(){

  const { id } = useParams();
  const URLCURSO = `${import.meta.env.VITE_API_BASE}/cursos/${id}`;
  const { data: curso, cargando, error } = useFetch(URLCURSO);

  if (cargando) return <div className="p-10 text-center">Cargando...</div>;
  
  if (!curso) return <div className="p-10 text-center">No se encontró el curso.</div>;

    return(
    // Contenedor de la tarjeta: Fondo blanco, sombra, bordes redondeados
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full h-full">
      
      {/* Sección de la Imagen (Izquierda) */}
      {/* md:w-1/3 define que ocupe un tercio del ancho en pantallas medianas/grandes */}
      <div className="md:w-1/3 h-64 md:h-auto relative">
        <img src={curso.imagen} alt={curso.titulo} className="w-full h-full object-cover"/>
      </div>

      {/* Sección del Contenido (Derecha) */}
      <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
        
        {/* Cabecera: Título/Autor a la izq, Info a la der */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1 uppercase tracking-wide">{curso.titulo}</h2>
            <div className="flex items-center text-gray-600 text-lg">
              <User size={18} className="mr-2" />
              <span className="font-medium">{curso.autor}</span>
            </div>
          </div>

          {/* Datos de Duración y Seniority alineados a la derecha (en desktop) */}
          <div className="flex flex-row sm:flex-col gap-3 sm:gap-1 text-sm sm:text-right text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="flex items-center sm:justify-end gap-2">
              <Clock size={16} className="text-blue-500" />
              <span className="font-semibold">Duración:</span> {curso.duracion}
            </div>
            <div className="flex items-center sm:justify-end gap-2">
              <Award size={16} className="text-purple-500" />
              <span className="font-semibold">Seniority:</span> {curso.seniority}
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="text-gray-600 text-justify mb-6 leading-relaxed grow">
          <h3 className="font-bold text-gray-800 mb-2">Descripción</h3>
          <p className="whitespace-pre-line">
            {curso.descripcion || "Este curso no tiene descripción disponible por el momento."}
          </p>
        </div>

        {/* Botón */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <Link to="/cursos" className="text-gray-500 hover:text-blue-600 font-medium">
            &larr; Volver
          </Link>
          {/* Reemplzar con url de mongo luego*/}
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 flex items-center gap-2"
            onClick={() => alert(`Redirigiendo al curso real...`)}>
            <BookOpen size={20} />
            Ir al curso
          </button>
        </div>

      </div>
    </div>
  )
}

export default CursoCardFull;