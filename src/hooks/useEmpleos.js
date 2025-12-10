import { useSearchParams } from 'react-router-dom';
import { useFetch } from './useFetch';

export const useEmpleos = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const paginaActual = parseInt(searchParams.get('pagina')) || 1;
    const busqueda = searchParams.get('busqueda') || "";
    const modalidad = searchParams.get('modalidad') || "";
    const seniority = searchParams.get('seniority') || "";

    const URLBASE = import.meta.env.VITE_API_BASE + "/empleos";
    
    // Son los parametros que recibe el backend. los filtros son por busqueda (kewyword) y modalidad/seniority
    const backendParams = new URLSearchParams({
        pagina: paginaActual,
        limite: 10,
        busqueda: busqueda,
        modalidad: modalidad,
        seniority: seniority
    }).toString();

    // Hago el fetch
    const { data: resultado, cargando, error } = useFetch(`${URLBASE}?${backendParams}`);
    //revisar en backedn pero basicamente devuelve el array de objetos en primera posicion y 
    // en 2da un objeto literal que va a servir para la paginacion
    const empleos = resultado?.data || [];
    const meta = resultado?.meta || { totalPages: 0, page: 1, total: 0 };

    // Acciones que actualizan la URL
    const actualizarURL = (nuevosValores) => {
        const nuevosParams = {
            busqueda, modalidad, seniority, pagina: paginaActual,
            ...nuevosValores
        };
        // Limpiar vacíos
        Object.keys(nuevosParams).forEach(key => {
            if (!nuevosParams[key]) delete nuevosParams[key];
        });
        setSearchParams(nuevosParams);
    };

    return {
        empleos, meta, cargando, error,
        busqueda, filtros: { modalidad, seniority }, paginaActual,
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