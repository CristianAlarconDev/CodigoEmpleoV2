import React from 'react'
import { useEmpleos } from '../hooks/useEmpleos.js';
import EmpleosList from '../components/EmpleosList.jsx';

const HomePage = () => {
  const {empleos, cargando}=useEmpleos();
  const empleosRecientes = empleos.slice(0, 4);


  return (
    <div className="flex flex-col min-h-screen">
      
      
      <main className="grow container mx-auto px-4 py-8">
        {/*seccion para empleos recientes */}
        <section>
          <h2>Ultimos empleos</h2>
          {
            cargando ? (
              <p>Cargando empleos...</p>
            ) : (<EmpleosList listaEmpleos={empleosRecientes} />)     
          }
        </section>
      </main>

      
    </div>
  )
}

export default HomePage
