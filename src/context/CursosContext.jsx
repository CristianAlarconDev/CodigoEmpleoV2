import { createContext, useContext, useEffect, useState } from "react";


const CursosContext = createContext();
export function CursosProvider({children}){
  const [cursos, setCursos]=useState([]);


  const mockApiCursos= "https://68ee91ccdf2025af78042146.mockapi.io/recursos/cursos" ;

  async function fetchMockApi(url){
    let data= [];
    try {
      const response = await fetch(url);
      
      if(!response.ok){
        throw new Error(`Ocurrió el error: ${response.status}`);
      }
      data =await response.json();
      
    } catch (error) {
      console.error(error);
      return null
    }
    return data;
  }

    // Esta función se usa en el Home
  async function obtenerCursos() {
    // Si ya tengo datos, NO hago fetch de nuevo (opcional, pero recomendado)
    if (cursos.length > 0) {
        return cursos;
    }
    
    // Si está vacío, voy a buscar
    const data = await fetchMockApi(mockApiCursos);
    setCursos(data);
    return data;
  }

  // Esta función es la "Inteligente" para el Detalle
  async function obtenerUnCurso(idBuscado) {
    let catalogoCursos = cursos;

    // 1. Verificación de Seguridad:
    // Si el array está vacío (porque recargué la página en el detalle),
    // tengo que ir a buscar los datos a la API sí o sí.
    if (catalogoCursos.length === 0) {
        catalogoCursos = await fetchMockApi(mockApiCursos);
        // Aprovecho y guardo en el estado para el futuro
        setCursos(catalogoCursos);
    }

    // 2. Ahora que seguro tengo datos (ya sean de memoria o recién traídos), busco:
    const cursoEncontrado = catalogoCursos.find(c => c.id == idBuscado);
    return cursoEncontrado;
  }


  

  return(
    <CursosContext.Provider value ={{obtenerCursos,obtenerUnCurso, cursos}}>
        {children}
    </CursosContext.Provider>
  )
}

export const useCursosContext = () => useContext(CursosContext);