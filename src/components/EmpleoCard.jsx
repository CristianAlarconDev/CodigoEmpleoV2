import React from 'react'

const EmpleoCard = (props) => {
    /* Revisar si esto mejor llevarlo a otro lado, desestructure todo*/
    const {titulo, empresa, ubicacion, salario, descripcion,
        modalidad, seniority}=props.dataEmpleo;
    

  return (
    <article>
        <section>
            <h3>{titulo}</h3>
            <p><strong>{empresa}</strong></p>
        </section>
        <section>
            <p>{descripcion}</p>
        </section>
        <section>
            <ul>
            <li>Ubicacion: {ubicacion}</li>
            <li>Salario:{salario}</li>
            <li>Modalidad: {modalidad}</li>
            <li>Seniority:{seniority}</li>
            </ul>
        </section>
        
    </article>
  )
}

export default EmpleoCard