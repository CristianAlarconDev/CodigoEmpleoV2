import { useState } from 'react';

export const useEmpleosFilters = (empleos) => {
    
    // Estado inicial de los filtros 
    const [filtros, setFiltros] = useState({
        seniority: 'todos',
        modalidad: 'todos',
        busqueda:''
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
        return texto.toString().toLowerCase().normalize("NFD")// Descompone letras con tilde 
            // 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/normalize'
            .replace(/[\u0300-\u036f]/g, "") // Borra los símbolos de tilde
            .trim();                   
    };

    const listaSegura = empleos || [];

    const empleosFiltrados = listaSegura.filter(empleo => {
        
        return Object.entries(filtros).every(([key, valorFiltro]) => {
            
            if (valorFiltro === 'todos' || valorFiltro === '') return true;

            if (key === 'busqueda') {
                const palabraBuscada = normalizarTexto(valorFiltro);
                const tituloBusqueda = normalizarTexto(empleo.titulo);
                const nombreEmpresa = normalizarTexto(empleo.empresa);
                return tituloBusqueda.includes(palabraBuscada) || nombreEmpresa.includes(palabraBuscada);
            }

            // Para los select igual que antes
            const valorEmpleo = empleo[key];
            if (!valorEmpleo) return false;
            
            return normalizarTexto(valorEmpleo) === normalizarTexto(valorFiltro);
        });
    });

    return { filtros, handleFilterChange, empleosFiltrados };
};