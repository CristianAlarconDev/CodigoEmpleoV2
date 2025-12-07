import { useSearchParams} from 'react-router-dom'
import {useEffect} from 'react'
export const usePaginacion = (datos = [], itemsPorPagina = 10, dependenciaReset) => {
    //se setea la pagina inicial como la primera
    const [searchParams, setSearchParams] = useSearchParams();
    const paginaUrl = searchParams.get('pagina');
    const paginaActual = Number(paginaUrl) || 1;

    const safeData = datos || []; 
    const totalPaginas = Math.ceil(safeData.length / itemsPorPagina);
    const indiceFinal = paginaActual * itemsPorPagina;
    const indiceInicial = indiceFinal - itemsPorPagina;
    const datosPaginados = safeData.slice(indiceInicial, indiceFinal);

    const irALaPagina = (numeroPagina) => {
        // por si se pone una url fuera de rango
        if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
            // se actualizo la url
            setSearchParams(prev => {
                prev.set('pagina', numeroPagina);
                return prev;
            });
        }
    };
    //cuando cambie las dependecias (por ahora solo filtros como array), se reinicia la paginacion con ir a la pagina 1
    //de lo contraria al usar filtros si estaba en por ej pagina 3 quedaba vacio todo si la data filtrada no llegaba a la
    //pagina3, revisar luego si es mejor manejarlo aca o donde
    useEffect(() => {
        if (paginaActual !== 1) {
            irALaPagina(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependenciaReset]);

    return {
        paginaActual,
        datosPaginados,
        totalPaginas,
        irALaPagina
    };
};