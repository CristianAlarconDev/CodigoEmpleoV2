import { useEffect } from "react";
import { useAutenticacionContext } from "../context/AutenticacionContext";

function CRUDCurso(){

   

    return(
    
    <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      {/* Contenedor Principal (Card) */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Encabezado */}
        <div className="bg-blue-600 py-6 px-8">
          <h2 className="text-2xl font-bold text-white text-center uppercase tracking-wide">
            Nuevo Curso
          </h2>
          <p className="text-blue-100 text-center text-sm mt-1">
            Completa la información para crear un curso
          </p>
        </div>

        {/* Formulario */}
        <form className="py-8 px-6 sm:px-10 space-y-6">
          
          {/* Título */}
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
              Título del Curso
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Ej: Introducción a React"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Autor y Duración (En una fila en pantallas grandes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="autor" className="block text-sm font-medium text-gray-700 mb-2">
                Autor
              </label>
              <input
                type="text"
                id="autor"
                name="autor"
                placeholder="Nombre del instructor"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div>
              <label htmlFor="duracion" className="block text-sm font-medium text-gray-700 mb-2">
                Duración
              </label>
              <input
                type="text"
                id="duracion"
                name="duracion"
                placeholder="Ej: 10 horas"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Tecnologías */}
          <div>
            <label htmlFor="tecnologias" className="block text-sm font-medium text-gray-700 mb-2">
              Tecnologías
            </label>
            <input
              type="text"
              id="tecnologias"
              name="tecnologias"
              placeholder="HTML, CSS, JavaScript..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Modalidad (Radio Buttons) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Modalidad
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer group">
                <input 
                  type="radio" 
                  name="modalidad" 
                  value="sincronico" 
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" 
                />
                <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">Sincrónico</span>
              </label>
              
              <label className="flex items-center cursor-pointer group">
                <input 
                  type="radio" 
                  name="modalidad" 
                  value="asincronico" 
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" 
                />
                <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">Asincrónico</span>
              </label>
            </div>
          </div>

          {/* Imagen (URL Link) */}
          <div>
            <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-2">
              URL de la Imagen
            </label>
            <input
              type="url"
              id="imagen"
              name="imagen"
              placeholder="https://ejemplo.com/imagen.jpg"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Descripción (Text Area) */}
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="4"
              placeholder="Escribe una breve descripción del curso..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
            ></textarea>
          </div>

          {/* Botón de Acción (Agregado por estética) */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Crear Curso
            </button>
          </div>

        </form>
      </div>
    </div>
  ;
    </>)
}

export default CRUDCurso;