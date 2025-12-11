import { Link } from "react-router-dom";


const CursoCard = ({ unCurso }) => {
  return (

    <div className="bg-white w-full max-w-xs h-72 rounded-xl overflow-hidden shadow-lg mx-auto 
                transition duration-300 ease-in-out 
                hover:translate-y-[-5px] hover:scale-[1.03] hover:shadow-2xl"> 
      
      <img src={unCurso.imagen} alt={unCurso.titulo} className="w-full h-36 object-cover" />
      
      {/* Cuerpo de la tarjeta */}
      <div className="p-4"> 
        
        {/* Título */}
        <h3 className="font-bold text-lg mb-1 text-gray-800 truncate">
          {unCurso.titulo}
        </h3>
        
        {/* Autor/Texto secundario */}
        <p className="text-gray-500 text-sm mb-3">
          Autor: {unCurso.autor}
        </p>
        
        <Link to={'/curso/'+ unCurso._id}>
        <button 
          className="w-full bg-blue-600 text-white font-semibold py-1.5 px-4 rounded-lg 
                    transition duration-300 ease-in-out 
                    hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50">
          Ver más
        </button>
        </Link>
      </div>
    </div>
  );
};

export default CursoCard;