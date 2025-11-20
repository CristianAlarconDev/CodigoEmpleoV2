

const CursoCard = ({ unCurso }) => {
  return (
    // Replicando .custom-card: max-width, height, border-radius, overflow, transition, y el hover effect
    // w-full (width: 100%)
    // max-w-xs (aproximación a max-width: 200px, usando una talla de Tailwind)
    // h-72 (aproximación a height: 300px, puedes ajustarlo)
    // rounded-xl (border-radius: 12px)
    // overflow-hidden
    // transition duration-300 ease-in-out (para el transform y box-shadow)
    // hover:translate-y-[-5px] hover:scale-[1.03] hover:shadow-2xl (el hover effect)
    <div className="bg-white w-full max-w-xs h-72 rounded-xl overflow-hidden shadow-lg mx-auto 
                transition duration-300 ease-in-out 
                hover:translate-y-[-5px] hover:scale-[1.03] hover:shadow-2xl"> 
      
      {/* Imagen - Replicando .custom-card-img */}
      {/* h-36 (aproximación a height: 140px, 140px es h-36 en Tailwind) 
          object-cover */}
      <img
        src={unCurso.imagen}
        alt={unCurso.titulo}
        className="w-full h-36 object-cover" 
      />
      
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
        
        {/* Botón - Replicando .custom-btn hover (azul de Bootstrap) */}
        <button 
          className="w-full bg-blue-600 text-white font-semibold py-1.5 px-4 rounded-lg 
                     transition duration-300 ease-in-out 
                     hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
          // La clase `hover:shadow-blue-500/50` simula el box-shadow azulado del hover.
        >
          Ver más
        </button>
      </div>
    </div>
  );
};

export default CursoCard;