import React from 'react';
import { useAutenticacionContext } from '../context/AutenticacionContext';
import { Link } from 'react-router-dom';
const PerfilPage = () => {
  
  //const { usuario } = useUsuarioContext();
  const { usuario, cargandoAuth } = useAutenticacionContext();
  //si esta cargando que se vea el spin o si no hay usuario
  if (cargandoAuth || !usuario) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600">
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
        
        {/* FOTO DE PERFIL , VIENE DE FIREBASE POR AHORA */}
        <img src={usuario.imagen||usuario.photoURL } alt="Foto Perfil" className="w-24 h-24 rounded-full border-4 border-blue-50 object-cover"
        onError={(e) => {
        e.target.onerror = null; // Previene bucles infinitos
        e.target.src = "https://ui-avatars.com/api/?name=" + usuario.nombre + "&background=random";
        }}
        />
        <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{usuario.nombre || usuario.displayName}</h1>
            <p className="text-gray-500">{usuario.email}</p>
            <div className="mt-3">
              {/*alguna etiqueta de rol luego, por ahora un estudiante */}
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                    {usuario.rol || "Usuario"}
                </span>
            </div>
        </div>
      </div>

      {/* ESTADISTICAS QUE VENDRIAN DE MOCKAPI O EL BACKEND, LUEGO VAN A SER COMPONENTES*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Cursos, DEBE COINCIDIR EL CAMPO EN MOCK/BACKEND */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Cursos Guardados</h3>
              <p className="text-3xl font-bold text-blue-600">
                  {usuario.cursos_guardados?.length || 0}
              </p>
          </div>

          {/* Empleos, DEBE COINCIDIR EL CAMPO EN MOCK/BACKEND */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Empleos Favoritos</h3>
              <p className="text-3xl font-bold text-blue-600">
                  {usuario.empleos_guardados?.length || 0}
              </p>
          </div>

          {/* Postulaciones */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Postulaciones</h3>
              <p className="text-3xl font-bold text-blue-600">
                  {usuario.postulaciones?.length || 0}
              </p>
          </div>
      </div>

    </div>
  );
};

export default PerfilPage;