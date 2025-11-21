import React from 'react'
import { useFetch } from '../hooks/useFetch.js';
import CursoCard from '../components/CursoCard.jsx';
import EmpleoCard from '../components/EmpleoCard.jsx';

const HomePage = () => {
  const {data:empleos, cargando:cargandoEmpleos}=useFetch(import.meta.env.VITE_MOCKAPI_ENDPOINT_EMPLEOS);
  const empleosRecientes = empleos.slice(0, 4);
  const {data:cursos, cargando:cargandoCursos}=useFetch(import.meta.env.VITE_MOCKAPI_ENDPOINT_CURSOS);
  const cursosRecientes = cursos.slice(0, 4);


  return (
    <div className="flex flex-col min-h-screen">
      
      
      <main className="grow container mx-auto px-4 py-8">
        {/*seccion para cursos recientes */}
        <section>
          <h2 >Cursos Recientes</h2>
          {cargandoCursos? (
                    <p>Cargando cursos...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {cursosRecientes.map((curso) => (
                          <CursoCard unCurso={curso} />
                        ))}
                    </div>
                    )
          }
        </section>
        {/*seccion para empleos recientes */}
        <section>
          <h2>Ultimos empleos</h2>
          
          {cargandoEmpleos? (
                    <p>Cargando empleos...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {empleosRecientes.map((unEmpleo) => (
                          <EmpleoCard key={unEmpleo.id} dataEmpleo={unEmpleo}/>
                      ))}
                    </div>
                    )
          }
        </section>
      </main>

      
    </div>
  )
}

export default HomePage
