import React from 'react'
import { NavLink } from 'react-router-dom';
const NavBar = () => {
  const getStyle = ({ isActive }) => {
  
  return isActive 
    ? 'text-white bg-black p-2' 
    : 'text-gray-300 p-2';      
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">MiMarca</h1>
        <ul className="flex gap-4">
          {/* Link de Home */}
          <li>
            <NavLink to="/" className={getStyle} end>
              Home
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/cursos" className={getStyle}>
              Cursos
            </NavLink>
          </li>
          <li>
            <NavLink to="/empleos" className={getStyle}>
              Empleos
            </NavLink>
          </li>
          <li>
            <NavLink to="/recursos" className={getStyle}>
              Recursos
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar
