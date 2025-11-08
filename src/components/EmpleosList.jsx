import React from 'react'
import EmpleoCard from './EmpleoCard.jsx'
const EmpleosList = (props) => {
    const empleos=props.listaEmpleos;
    if (!empleos.length) {
        return <p>No se encontraron empleos aun</p>;
    }
    //console.log(empleos);
  return (
    <div><h2>Empleo List</h2>
    <EmpleoCard empleo={empleos[0]} />
    </div>
  )
}

export default EmpleosList