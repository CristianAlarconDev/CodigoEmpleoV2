import React, { useEffect, useState } from 'react'
import CursoCard from '../components/CursoCard';
import { Container, Row, Col } from "react-bootstrap";

const CursosPage = () => {

  const [cursos, setCursos]=useState([]);
  const [cargando, setCargando]=useState(true);

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
  
  useEffect(()=>{
    const cargarCursos =async ()=>{
      try {
        const cursosData =await fetchMockApi(mockApiCursos);
        console.log("esto es el fetch :", cursosData)
        setCursos(cursosData);
      } catch (error) {
        console.error("Error al cargar cursos:", error);
      }
      finally{
        setCargando(false);
      }
      
    }
    cargarCursos();
    
  },
  [] );


  return (
    <>
     <Container className="my-4">
      <Row className="justify-content-center g-4">
        {cargando? (<p>Buscando cursos...</p>):
        cursos.map((item) => (
          <Col xs={12} sm={6} md={4} lg={3} key={item.id}>
            <CursoCard unCurso={item}
            />
          </Col>
        ))}
      </Row>
    </Container>
    </>
  )
}

export default CursosPage