import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Paginador = ({ paginaActual, totalPaginas, onChangePagina }) => {

    if (totalPaginas <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-8">
        
        {/* Ir al inicio (<<) */}
        <button
            onClick={() => onChangePagina(1)}
            disabled={paginaActual === 1}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600"
        >
            <ChevronsLeft size={20} />
        </button>

        {/* Anterior (<) */}
        <button
            onClick={() => onChangePagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600"
        >
            <ChevronLeft size={20} />
        </button>

        {/* Info: pagina x de y*/}
        <span className="font-medium text-gray-700">
            Página {paginaActual} de {totalPaginas}
        </span>

        {/* Siguiente (>) */}
        <button
            onClick={() => onChangePagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600"
        >
            <ChevronRight size={20} />
        </button>

        {/* Ir al final (>>) */}
        <button
            onClick={() => onChangePagina(totalPaginas)}
            disabled={paginaActual === totalPaginas}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600"
        >
            <ChevronsRight size={20} />
        </button>

        </div>
    );
};

export default Paginador;