import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CursosPage from '../pages/CursosPage';
import EmpleosPage from '../pages/EmpleosPage';
import RecursosPage from '../pages/RecursosPage';
import React from 'react'
import LoginPage from '../pages/LoginPage';

const Rutas = () => {
  return (
    // <Routes> es el contenedor de todas tus rutas
    <Routes>
  
      <Route path="/" element={<HomePage />} />
     
      <Route path="/cursos" element={<CursosPage />} />

      <Route path="/empleos" element={<EmpleosPage />} />
      
      <Route path="/recursos" element={<RecursosPage />} />

      <Route path="/login" element={<LoginPage />} />
     
      {/* <Route path="*" element={<NotFoundPage />} /> */}

    </Routes>
  );
};
export default Rutas