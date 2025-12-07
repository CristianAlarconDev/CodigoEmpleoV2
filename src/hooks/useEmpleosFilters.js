import { useState } from 'react';

export const useEmpleosFilters = (empleos) => {
    
    // Estado inicial de los filtros 
    const [filtros, setFiltros] = useState({
        seniority: 'todos',
        modalidad: 'todos'
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFiltros(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // parsea el texto a validar
    const normalizarTexto = (texto) => {
        if (!texto) return "";
        return texto
            .toString()                 
            .toLowerCase()              
            .normalize("NFD")           // Descompone letras con tilde 
            // 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/normalize'
            .replace(/[\u0300-\u036f]/g, "") // Borra los símbolos de tilde
            .trim();                   
    };

const listaSegura = empleos || [];

    const empleosFiltrados = listaSegura.filter(empleo => {
        
        // empleo debe cumplir every condition
        return Object.entries(filtros).every(([key, valorFiltro]) => {
            
            // si el filtro es todos etc etc
            if (valorFiltro === 'todos') return true;

            const valorEmpleo = empleo[key];
            const valorEmpleoParseado = normalizarTexto(valorEmpleo);
            const filtroParseado = normalizarTexto(valorFiltro);
            
            return valorEmpleoParseado === filtroParseado;
        });
    });

    return { filtros, handleFilterChange, empleosFiltrados };
};