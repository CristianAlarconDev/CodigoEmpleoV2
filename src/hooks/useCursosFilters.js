import { useState } from 'react';

export const useCursosFilters = (cursos) => {
    
    const [filtros, setFiltros] = useState({
        busqueda: '',
        tecnologia: 'todos', 
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

    const normalizarTexto = (texto) => {
        if (!texto) return "";
        return texto.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    };

    const listaSegura = cursos || [];

    const cursosFiltrados = listaSegura.filter(curso => {
        
        return Object.entries(filtros).every(([key, valorFiltro]) => {
            
            if (valorFiltro === 'todos' || valorFiltro === '') return true;

            // para el search bar
            if (key === 'busqueda') {
                const palabraBuscada = normalizarTexto(valorFiltro);
                const titulo = normalizarTexto(curso.titulo);
                const autor = normalizarTexto(curso.autor);
                const tecnologias = normalizarTexto(curso.tecnologias_csv);
                const modalidad = normalizarTexto(curso.modalidad);

                return titulo.includes(palabraBuscada) || autor.includes(palabraBuscada) ||
                    tecnologias.includes(palabraBuscada) ||modalidad.includes(palabraBuscada);
            }

            // para el filtro tecnologia, tiene un condicional aparte porque debe buscar dentro de tecnologias_csv
            if (key === 'tecnologia') {
                const tecnologiasDelCurso = normalizarTexto(curso.tecnologias_csv);
                const tecnologiaBuscada = normalizarTexto(valorFiltro);
                
                return tecnologiasDelCurso.includes(tecnologiaBuscada);
            }

            // para los demas filtros que no son cadenas si no valores simples
            const valorCurso = curso[key];
            if (!valorCurso) return false;
            
            return normalizarTexto(valorCurso) === normalizarTexto(valorFiltro);
        });
    });

    return { filtros, handleFilterChange, cursosFiltrados };
};