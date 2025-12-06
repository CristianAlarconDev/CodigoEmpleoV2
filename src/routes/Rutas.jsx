import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CursosPage from '../pages/CursosPage';
import EmpleosPage from '../pages/EmpleosPage';
import RecursosPage from '../pages/RecursosPage';
import React from 'react'
import LoginPage from '../pages/LoginPage';
import CursoCardFull from '../components/CursoCardFull';
import CRUDCurso from '../components/CRUDCurso';
import EmpleoCardFull from '../components/EmpleoCardFull.jsx';

const Rutas = () => {
  return (
    // <Routes> es el contenedor de todas tus rutas
    <Routes>
  
      <Route path="/" element={<HomePage />} />
     
      <Route path="/cursos" element={<CursosPage />} />

      <Route path="/empleos" element={<EmpleosPage />} />
      
      <Route path="/recursos" element={<RecursosPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path='/cursos/:id' element={<CursoCardFull/>}/>

      <Route path='/empleo/:id' element={< EmpleoCardFull/>}/>

      <Route path='/crud' element={<CRUDCurso/>}/>
     
      {/* <Route path="*" element={<NotFoundPage />} /> */}

    </Routes>
  );
};
export default Rutas