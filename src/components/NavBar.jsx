import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAutenticacionContext } from '../context/AutenticacionContext';
import { LogOut, Menu, User, X, Shield } from 'lucide-react';
import Logo from './Logo'; 

const NavBar = () => {
  const { usuario, logout, esAdmin } = useAutenticacionContext();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await logout(); 
    closeMenu();    
    navigate('/');  
  };

  // Estilos base para los links normales
  const linkBaseStyle = "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out block";
  
  // Función para manejar el estado Activo/Inactivo de los links
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? `${linkBaseStyle} text-white bg-gray-800 shadow-sm border-b-2 border-blue-500` 
      : `${linkBaseStyle} text-gray-300 hover:bg-gray-700 hover:text-white`; 
  };

 
  const loginButtonStyle = "px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ease-in-out block bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center";

  return (
    <nav className="bg-gray-900 shadow-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link to="/" className="hover:opacity-90 transition-opacity shrink-0" onClick={closeMenu}>
            <Logo />
          </Link>

          {/* === MENÚ DESKTOP === */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/cursos" className={getNavLinkClass}>Cursos</NavLink>
              <NavLink to="/empleos" className={getNavLinkClass}>Empleos</NavLink>
              <NavLink to="/recursos" className={getNavLinkClass}>Recursos</NavLink>
              
              {/* Link de Admin (Solo si es admin) */}
              {esAdmin(usuario) && (
                <NavLink to="/crud" className={getNavLinkClass}>
                    <span className="flex items-center gap-1 text-yellow-500"><Shield size={16}/> Admin</span>
                </NavLink>
              )}

              {usuario && (
                <NavLink to="/perfil" className={getNavLinkClass}>Mi Perfil</NavLink>
              )}

              {/* SECCIÓN USUARIO / LOGIN */}
              <div className="ml-4 pl-4 border-l border-gray-700 flex items-center gap-4">
                {usuario ? (
                    <>
                        <span className="text-gray-300 text-sm flex items-center gap-2">
                            <User size={16} className="text-blue-400"/>
                            <span className="truncate max-w-[150px]">{usuario.nombre}</span>
                        </span>
                        <button 
                            onClick={handleLogout} 
                            className="flex items-center gap-2 bg-gray-800 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all border border-gray-700 hover:border-red-600"
                        >
                            <LogOut size={16} />
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className={loginButtonStyle}>
                        Iniciar Sesión
                    </NavLink>
                )}
              </div>
            </div>
          </div>

          {/* === BOTÓN HAMBURGUESA MÓVIL === */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* === MENÚ MÓVIL DESPLEGABLE === */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-900 border-t border-gray-800 shadow-xl`} id="mobile-menu">
        <div className="px-4 pt-4 pb-6 space-y-2">
          
          <NavLink to="/" onClick={closeMenu} className={getNavLinkClass} end>Home</NavLink>
          <NavLink to="/cursos" onClick={closeMenu} className={getNavLinkClass}>Cursos</NavLink>
          <NavLink to="/empleos" onClick={closeMenu} className={getNavLinkClass}>Empleos</NavLink>
          <NavLink to="/recursos" onClick={closeMenu} className={getNavLinkClass}>Recursos</NavLink>
          
          {/* Admin Móvil  */}
          {esAdmin(usuario) && (
            <NavLink 
                to="/crud" 
                onClick={closeMenu} 
                className={({ isActive }) => 
                    isActive 
                    ? `${linkBaseStyle} bg-gray-800 text-yellow-500 border-b-2 border-yellow-500` 
                    : `${linkBaseStyle} text-yellow-500 hover:bg-gray-700`
                }
            >
                 Panel Admin
            </NavLink>
          )}
          
          {usuario && (
              <NavLink to="/perfil" onClick={closeMenu} className={getNavLinkClass}>Mi Perfil</NavLink>
          )}

          <div className="border-t border-gray-700 mt-4 pt-4">
            {usuario ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-gray-300 px-2">
                      <div className="bg-gray-800 p-2 rounded-full border border-gray-700">
                        <User size={20} className="text-blue-400"/>
                      </div>
                      <div className="font-medium truncate">{usuario.nombre}</div>
                  </div>
                  
                  {/* LOGOUT MÓVIL  */}
                  <button onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-3 rounded-lg text-sm font-bold transition-colors"
                  >
                      <LogOut size={18} />
                      Cerrar Sesión
                  </button>
                </div>
            ) : (
                <div className="px-2">
                    <NavLink to="/login" onClick={closeMenu} className={loginButtonStyle}>
                        Iniciar Sesión
                    </NavLink>
                </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;