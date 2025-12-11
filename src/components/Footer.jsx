import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-12 pb-6 mt-auto"  >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Columna 1: Logo y Descripción */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white text-xl font-bold">
                <Code className="text-blue-500" />
                <span>CódigoEmpleo</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Tu puente hacia el mundo profesional IT. Capacítate con los mejores cursos y postúlate a las empresas líderes del sector tecnológico.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/cursos" className="hover:text-blue-400 transition-colors">Cursos</Link>
              </li>
              <li>
                <Link to="/empleos" className="hover:text-blue-400 transition-colors">Empleos</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition-colors">Ingresar</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes y Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Síguenos</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-sky-500 hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-700 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-500">contacto@codigoempleo.com</p>
          </div>

        </div>

        {/* Línea divisoria y Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CódigoEmpleo </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer