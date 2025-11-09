import React from 'react'

const Filters = () => {
  return (
    /*Contenedor general */
    <section className='border'>
        <h2>Filtros</h2>
        <label htmlFor="seniority-select"> Seniority</label>
        <select name="seniority" id="seniority-select">
            <option value="todos">Todos los niveles</option>
            <option value="trainee">Trainee</option>
            <option value="junior">Junior</option>
            <option value="semi-senior">Semi-Senior</option>
            <option value="senior">Senior</option>
        </select>
        <fieldset>
            <legend>Modalidad</legend>
            <input type="checkbox" value="remoto" id="modalidad-remoto" name='remoto'/>
            <label htmlFor="modalidad-remoto">Remoto</label>
            <input type="checkbox" value="hibrido"id="modalidad-hibrido" input='hibrido'/>
            <label htmlFor="modalidad-hibrido">Hibrido</label>
            <input type="checkbox" value="presencial"id="modalidad-presencial" name='presencial'/>
            <label htmlFor="modalidad-presencial">Presencial</label>
        </fieldset>
    </section>
  )
}

export default Filters