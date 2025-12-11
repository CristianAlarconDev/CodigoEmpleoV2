import React from 'react'
import { useFetch } from '../hooks/useFetch.js';
import CursoCard from '../components/CursoCard.jsx';
import EmpleoCard from '../components/EmpleoCard.jsx';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  // 1. Fetch optimizado: Pedimos solo 4 items al backend
  const URL_CURSOS = `${import.meta.env.VITE_API_BASE}/cursos?limite=4`;
  const URL_EMPLEOS = `${import.meta.env.VITE_API_BASE}/empleos?limite=4`;

  const { data: resCursos, cargando: cargandoCursos } = useFetch(URL_CURSOS);
  const { data: resEmpleos, cargando: cargandoEmpleos } = useFetch(URL_EMPLEOS);

  
  const cursosRecientes = resCursos?.data || [];
  const empleosRecientes = resEmpleos?.data || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Hero Section simple (Opcional, para dar bienvenida) */}
      <section className="bg-slate-900 text-white py-16 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Encuentra tu futuro IT</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
              La plataforma donde conectamos talento con oportunidades. Cursos para crecer y empleos para despegar.
          </p>
      </section>

      <main className="grow py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          
        {/* SECCIÓN CURSOS RECIENTES */}
          <section>
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">
                    Cursos Destacados
                </h2>
                <Link to="/cursos" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
                    Ver todos <ArrowRight size={18}/>
                </Link>
            </div>

            {cargandoCursos ? (
                  <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                  </div>
                  ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                          {cursosRecientes.map((curso) => (
                            // _id de Mongo
                            <div key={curso._id}>
                                <CursoCard unCurso={curso} />
                            </div>
                          ))}
                      </div>
                  )
            }
          </section>

          {/* SECCIÓN EMPLEOS RECIENTES */}
          <section>
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-green-500 pl-4">
                    Últimas Ofertas
                </h2>
                <Link to="/empleos" className="text-green-600 font-semibold hover:underline flex items-center gap-1">
                    Ver todas <ArrowRight size={18}/>
                </Link>
            </div>
              
            {cargandoEmpleos ? (
                  <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
                  </div>
                  ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {empleosRecientes.map((unEmpleo) => (
                            <EmpleoCard key={unEmpleo._id} dataEmpleo={unEmpleo}/>
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