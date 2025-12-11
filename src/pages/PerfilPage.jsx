import React, { useState } from 'react';
import { useAutenticacionContext } from '../context/AutenticacionContext';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Send } from 'lucide-react'; // Íconos opcionales para decorar

const PerfilPage = () => {
  const { usuario, cargandoAuth } = useAutenticacionContext();
  
  const [seccionActiva, setSeccionActiva] = useState('cursos');

  // Si está cargando o no hay usuario
  if (cargandoAuth || !usuario) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Componente para alternar las pestañas
  const TabButton = ({ id, titulo, count, icon: Icon }) => (
    <button 
        onClick={() => setSeccionActiva(id)}
        className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-200 ${
            seccionActiva === id 
            ? 'bg-blue-50 border-blue-500 shadow-md transform scale-105' // Estilo Activo
            : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm' // Estilo Inactivo
        }`}
    >
        <div className={`mb-2 p-2 rounded-full ${seccionActiva === id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
            <Icon size={24} />
        </div>
        <span className={`font-bold text-sm uppercase ${seccionActiva === id ? 'text-blue-800' : 'text-gray-500'}`}>
            {titulo}
        </span>
        <span className={`text-3xl font-bold mt-1 ${seccionActiva === id ? 'text-blue-600' : 'text-gray-800'}`}>
            {count}
        </span>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      
      {/* 1. HEADER DEL PERFIL */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
        <img 
            src={usuario.imagen || usuario.photoURL } 
            alt="Foto Perfil" 
            className="w-24 h-24 rounded-full border-4 border-blue-50 object-cover"
            onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://ui-avatars.com/api/?name=" + (usuario.nombre || "User") + "&background=random";
            }}
        />
        <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{usuario.nombre || usuario.displayName}</h1>
            <p className="text-gray-500">{usuario.email}</p>
            <div className="mt-3">
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wide">
                    {usuario.rol || "Estudiante"}
                </span>
            </div>
        </div>
      </div>

      {/* 2. BARRA DE PESTAÑAS (HORIZONTAL) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <TabButton 
            id="cursos" 
            titulo="Cursos Guardados" 
            count={usuario.cursos_guardados?.length || 0} 
            icon={BookOpen}
          />
          <TabButton 
            id="empleos" 
            titulo="Empleos Favoritos" 
            count={usuario.empleos_guardados?.length || 0} 
            icon={Briefcase}
          />
          <TabButton 
            id="postulaciones" 
            titulo="Postulaciones" 
            count={usuario.postulaciones?.length || 0} 
            icon={Send}
          />
      </div>

      {/* 3. ÁREA DE CONTENIDO (ANCHO COMPLETO) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[300px] p-6 animate-in fade-in duration-300">
        
        {/* === CONTENIDO CURSOS === */}
        {seccionActiva === 'cursos' && (
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <BookOpen className="text-blue-500"/> Mis Cursos Guardados
                </h2>
                {usuario.cursos_guardados?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {usuario.cursos_guardados.map(curso => (
                            <div key={curso._id} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition bg-white">
                                <img src={curso.imagen} className="w-20 h-20 rounded-lg object-cover bg-gray-100" alt="" />
                                <div className="flex flex-col justify-between grow">
                                    <div>
                                        <h3 className="font-bold text-gray-900 line-clamp-1">{curso.titulo}</h3>
                                        <p className="text-sm text-gray-500">{curso.autor}</p>
                                    </div>
                                    <Link to={`/curso/${curso._id}`} className="text-blue-600 text-sm font-medium hover:underline self-end">
                                        Ver curso →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-400">
                        <p>No has guardado cursos todavía.</p>
                        <Link to="/cursos" className="text-blue-500 hover:underline">Explorar cursos</Link>
                    </div>
                )}
            </div>
        )}

        {/* === CONTENIDO EMPLEOS === */}
        {seccionActiva === 'empleos' && (
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Briefcase className="text-blue-500"/> Mis Empleos Favoritos
                </h2>
                {usuario.empleos_guardados?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {usuario.empleos_guardados.map(empleo => (
                            <div key={empleo._id} className="p-4 border rounded-lg hover:shadow-md transition bg-white flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900">{empleo.titulo}</h3>
                                    <p className="text-sm text-gray-600">{empleo.empresa}</p>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mt-2 inline-block">
                                        {empleo.modalidad}
                                    </span>
                                </div>
                                <Link to={`/empleo/${empleo._id}`} className="text-blue-600 text-sm font-medium hover:underline mt-4 self-end">
                                    Ver oferta →
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-400">
                        <p>No has guardado empleos todavía.</p>
                        <Link to="/empleos" className="text-blue-500 hover:underline">Explorar ofertas</Link>
                    </div>
                )}
            </div>
        )}

        {/* === CONTENIDO POSTULACIONES === */}
        {seccionActiva === 'postulaciones' && (
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Send className="text-blue-500"/> Mis Postulaciones
                </h2>
                {usuario.postulaciones?.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {usuario.postulaciones.map(post => (
                            <div key={post.empleo._id || post._id} className="flex justify-between items-center p-4 border rounded-lg bg-white hover:bg-gray-50 transition">
                                <div>
                                    <h3 className="font-bold text-gray-900">{post.empleo.titulo}</h3>
                                    <p className="text-sm text-gray-500">{post.empleo.empresa}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                            post.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                            post.estado === 'Rechazado' ? 'bg-red-100 text-red-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {post.estado}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            • {new Date(post.fecha_postulacion).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <Link to={`/empleo/${post.empleo._id}`} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-white hover:text-blue-600 transition bg-gray-50">
                                    Ver
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-400">
                        <p>No te has postulado a ninguna oferta.</p>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default PerfilPage;