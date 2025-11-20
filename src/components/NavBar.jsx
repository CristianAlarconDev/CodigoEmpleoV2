import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useAutenticacionContext } from '../context/AutenticacionContext';
import { LogOut, Menu, User } from 'lucide-react';
const NavBar = () => {
  const { usuario, logout } = useAutenticacionContext();
  const [isOpen, setIsOpen] = useState(false);

  // Función para cerrar el menú móvil al hacer click en un enlace
  const closeMenu = () => setIsOpen(false);

  // Estilos base para los links
  const linkBaseStyle = "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out block";
  
  // Lógica de estilos para NavLink (Activo vs Inactivo)
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? `${linkBaseStyle} bg-indigo-600 text-white shadow-md transform scale-105` // Estilo Activo
      : `${linkBaseStyle} text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-sm`; // Estilo Inactivo + Hover
  };

  return (
    <nav className="bg-gray-900 shadow-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              MiMarca
            </h1>
          </div>

          {/* MENÚ DESKTOP (Oculto en móvil) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={getNavLinkClass} end>Home</NavLink>
              <NavLink to="/cursos" className={getNavLinkClass}>Cursos</NavLink>
              <NavLink to="/empleos" className={getNavLinkClass}>Empleos</NavLink>
              <NavLink to="/recursos" className={getNavLinkClass}>Recursos</NavLink>

              {/* SECCIÓN USUARIO DESKTOP */}
              {usuario ? (
                <div className="flex items-center ml-4 gap-4 pl-4 border-l border-gray-700">
                   <span className="text-gray-300 text-sm flex items-center gap-2">
                      <User size={16} className="text-indigo-400"/>
                      Hola, {usuario.nombre}
                   </span>
                   <button 
                      onClick={logout} 
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm"
                   >
                      <LogOut size={16} />
                      Salir
                   </button>
                </div>
              ) : (
                <NavLink to="/login" className={getNavLinkClass}>Login</NavLink>
              )}
            </div>
          </div>

          {/* BOTÓN HAMBURGUESA MÓVIL (Visible solo en móvil) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {/* Animación simple de altura/opacidad con clases condicionales */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-800 border-t border-gray-700`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" onClick={closeMenu} className={getNavLinkClass} end>Home</NavLink>
          <NavLink to="/cursos" onClick={closeMenu} className={getNavLinkClass}>Cursos</NavLink>
          <NavLink to="/empleos" onClick={closeMenu} className={getNavLinkClass}>Empleos</NavLink>
          <NavLink to="/recursos" onClick={closeMenu} className={getNavLinkClass}>Recursos</NavLink>
          
          <div className="border-t border-gray-700 mt-4 pt-4 pb-2">
             {usuario ? (
                <div className="flex flex-col gap-3 px-3">
                   <div className="flex items-center gap-3 text-gray-300">
                      <div className="bg-gray-700 p-2 rounded-full">
                        <User size={20} className="text-indigo-400"/>
                      </div>
                      <div className="font-medium">Hola, {usuario.nombre}</div>
                   </div>
                   <button 
                      onClick={() => { logout(); closeMenu(); }}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors mt-2"
                   >
                      <LogOut size={18} />
                      Cerrar Sesión
                   </button>
                </div>
              ) : (
                <NavLink to="/login" onClick={closeMenu} className={getNavLinkClass}>
                    Login
                </NavLink>
              )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
