import React from 'react'
import EmpleoCard from './EmpleoCard.jsx'
const EmpleosList = (props) => {
    
    const empleos=props.listaEmpleos;
    if (!empleos.length) {
        return <p>No se encontraron empleos aun</p>;
    }
    //console.dir(empleos)
    //console.log(empleos);


    return (
    <div><h2>Empleo List</h2>
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {empleos.map(unEmpleo => (
                <EmpleoCard key={unEmpleo.id} dataEmpleo={unEmpleo} />
        ))}
    </section>
    </div>
    )
}

export default EmpleosList