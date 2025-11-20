import { createContext, useContext, useEffect, useState } from "react";


const CursosContext = createContext();
export function CursosProvider({children}){
  const [cursos, setCursos]=useState([]);
  const [cursoUnico,setCursoUnico] = useState([])


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
    }
    return data;
  }

    async function obtenerCursos() {
        const data = await fetchMockApi(mockApiCursos);
        setCursos(data)
        return(data)
    }


    async function obtenerUnCurso(id){
        const cursos = await obtenerCursos()
        const curso = cursos.find((c) => c.id === parseInt(id));
        setCursoUnico(curso)
    }



  

  return(
    <CursosContext.Provider value ={{obtenerCursos,cursos,obtenerUnCurso,cursoUnico}}>
        {children}
    </CursosContext.Provider>
  )
}

export const useCursosContext = () => useContext(CursosContext);