import { useSearchParams } from 'react-router-dom';
import { useFetch } from './useFetch';

export const useCursos = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // PARA QUE SE PUEDA LEER LOS PARAMETROS DE LA URL
    const paginaActual = parseInt(searchParams.get('pagina')) || 1;
    const busqueda = searchParams.get('busqueda') || "";
    const seniority = searchParams.get('seniority') || ""; 
    const modalidad = searchParams.get('modalidad') || "";

    const URLBASE = import.meta.env.VITE_API_BASE + "/cursos"; 
    
    // PARAMS PARA EL BACKEND
    const backendParams = new URLSearchParams({
        pagina: paginaActual,
        limite: 9,
        busqueda: busqueda,
        seniority: seniority,
        modalidad: modalidad
    }).toString();

    // HAGO EL FETCH
    const { data: resultado, cargando, error } = useFetch(`${URLBASE}?${backendParams}`);

    const cursos = resultado?.data || [];
    const meta = resultado?.meta || { totalPages: 0, page: 1, total: 0 };

    // ACTUALZIO LA URL CUANDO CAMBIEN LOS FILTROS O BUSQUEDA
    const actualizarURL = (nuevosValores) => {
        const nuevosParams = {
            busqueda, seniority, modalidad, pagina: paginaActual,
            ...nuevosValores
        };
        // Limpiar vacíos
        Object.keys(nuevosParams).forEach(key => {
            if (!nuevosParams[key]) delete nuevosParams[key];
        });
        setSearchParams(nuevosParams);
    };

    return {
        cursos, meta, cargando, error,
        busqueda, filtros: { seniority, modalidad }, paginaActual,
        acciones: {
            buscar: (t) => actualizarURL({ busqueda: t, pagina: 1 }),
            filtrar: (e) => actualizarURL({ [e.target.name]: e.target.value, pagina: 1 }),
            cambiarPagina: (n) => {
                actualizarURL({ pagina: n });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            limpiarFiltros: () => setSearchParams({})
        }
    };
};