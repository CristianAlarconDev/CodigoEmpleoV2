import { useState, useEffect } from 'react';

export const usePaginacion = (datos = [], itemsPorPagina = 10) => {
    //se setea la pagina inicial como la primera
    const [paginaActual, setPaginaActual] = useState(1);

    //si cambia la el array de empleos/cursos porque se aplicao algun filtro entonces se setea la primera pagina
    useEffect(() => {
        setPaginaActual(1);
    }, [datos, itemsPorPagina]);

    const safeData = datos || []; 
    const totalPaginas = Math.ceil(safeData.length / itemsPorPagina);
    const indiceFinal = paginaActual * itemsPorPagina;
    const indiceInicial = indiceFinal - itemsPorPagina;
    const datosPaginados = safeData.slice(indiceInicial, indiceFinal);

    //handler para setear una pagina nueva
    const irALaPagina = (numeroPagina) => {
        // Validación para no salir del rango de indices
        if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
            setPaginaActual(numeroPagina);
        }
    };

    return {
        paginaActual,
        datosPaginados,
        totalPaginas,
        irALaPagina
    };
};