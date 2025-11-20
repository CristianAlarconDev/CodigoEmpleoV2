import { useParams } from "react-router-dom";
import { CursosProvider, useCursosContext } from "../context/CursosContext";
import { useEffect, useState } from "react";
import { Award, BookOpen, Clock, User } from "lucide-react";

function CursoCardFull(){

    const { id } = useParams();
    const {obtenerUnCurso,cursoUnico} = useCursosContext();
    const[curso,setCurso] = useState([])
    const[cargando,setCargando]= useState(true)
    

    useEffect(()=>{
        obtenerUnCurso(id).then( () => {
            setCurso(cursoUnico)
            setCargando(false)
        })
    },[id])
    
    
    if(cargando){
        return(<p>Cargando</p>)
    }
    return(
    // Contenedor de la tarjeta: Fondo blanco, sombra, bordes redondeados
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full h-full">
      
      {/* Sección de la Imagen (Izquierda) */}
      {/* md:w-1/3 define que ocupe un tercio del ancho en pantallas medianas/grandes */}
      <div className="md:w-1/3 h-64 md:h-auto relative">
        <img 
          src={curso.imagen} 
          alt={curso.titulo} 
          className="w-full h-full object-cover"
        />
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
        <div className="text-gray-600 text-justify mb-6 leading-relaxed flex-grow">
          <p>Aca deberiamos agregar una descripcion del curso</p>
        </div>

        {/* Botón */}
        <div className="flex justify-end mt-4">
          <button 
    
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 flex items-center gap-2"
          >
            <BookOpen size={20} />
            Ir al curso
          </button>
        </div>

      </div>
    </div>
  )
}

export default CursoCardFull;