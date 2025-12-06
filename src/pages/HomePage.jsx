import React from 'react'
import { useFetch } from '../hooks/useFetch.js';
import CursoCard from '../components/CursoCard.jsx';
import EmpleoCard from '../components/EmpleoCard.jsx';

const HomePage = () => {
  const {data:empleos, cargando:cargandoEmpleos}=useFetch(import.meta.env.VITE_MOCKAPI_ENDPOINT_EMPLEOS);
  const empleosRecientes = empleos?.slice(0, 4) || [];
  const {data:cursos, cargando:cargandoCursos}=useFetch(import.meta.env.VITE_MOCKAPI_ENDPOINT_CURSOS);
  const cursosRecientes = cursos?.slice(0, 4) || [];


  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
        {/*seccion para cursos recientes */}
          <section>
            <h2 className=
            "text-3xl font-bold text-gray-900 mb-8 border-l-4 border-blue-600 pl-4">
              Cursos Recientes</h2>
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
            <h2 className=
            "text-3xl font-bold text-gray-900 mb-8 border-l-4 border-blue-600 pl-4">
              Ultimos empleos</h2>  
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
        </div>
      </main>
    </div>
  )
}

export default HomePage
