import React from 'react'
import { useFetch } from '../hooks/useFetch.js';
import EmpleosList from '../components/EmpleosList.jsx';

const HomePage = () => {
  const {data, cargando}=useFetch(import.meta.env.VITE_MOCKAPI_ENDPOINT_EMPLEOS);
  const empleosRecientes = data.slice(0, 4);
  

  return (
    <div className="flex flex-col min-h-screen">
      
      
      <main className="grow container mx-auto px-4 py-8">
        {/*seccion para cursos recientes */}
        <section>
          <h2>Cursos Recientes</h2>

        </section>
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
