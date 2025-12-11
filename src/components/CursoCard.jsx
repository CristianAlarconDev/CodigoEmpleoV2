import { Link } from "react-router-dom";

const CursoCard = ({ unCurso }) => {
  return (
  
    <div className="bg-white w-full h-full rounded-xl overflow-hidden shadow-lg 
                flex flex-col justify-between border border-gray-100
                transition duration-300 ease-in-out 
                hover:translate-y-[-5px] hover:shadow-2xl"> 
      
      
      <div className="h-48 w-full bg-gray-200 relative">
        <img
            src={unCurso.imagen}
            alt={unCurso.titulo}
            className="w-full h-full object-cover" 
            onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=Curso"}
        />
      </div>
      
      {/* CONTENIDO */}
      <div className="p-5 flex flex-col grow"> 
        
        <h3 className="font-bold text-lg leading-snug text-gray-900 mb-2 line-clamp-2" title={unCurso.titulo}>
          {unCurso.titulo}
        </h3>
        
        <p className="text-gray-500 text-sm font-medium mb-4">
          Por {unCurso.autor}
        </p>
        
        {/* BOTÓN AL FONDO */}
        <div className="mt-auto pt-2">
            <Link to={'/curso/'+ unCurso._id} className="block w-full">
                <button 
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg 
                            transition-all duration-300 ease-in-out 
                            hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30">
                Ver más
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default CursoCard;