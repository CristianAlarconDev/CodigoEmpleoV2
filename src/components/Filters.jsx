import React from 'react'

const Filters = ({seniorityActual,onSeniorityChange}) => {
    const handleDebugChange = (event) => {
    
    const target = event.target;

    console.log("===== 🕵️‍♂️ CAMBIO DETECTADO 🕵️‍♂️ =====");
    
   
    console.log("Tipo de Elemento (target.type):", target.type);

    
    console.log("Name (target.name):", target.name);
    
   
    console.log("Value (target.value):", target.value);

    
    console.log("Checked (target.checked):", target.checked);

    console.log("---");
    
 
    console.log("Objeto 'target' completo (usa  ▶):");
    console.dir(target);
    
    console.log("====================================");
    };





/*handleDebugChange */
  return (
    /*Contenedor general */
    <section className='border'>
        <h2>Filtros</h2>
        <label htmlFor="seniority-select"> Seniority</label>
        <select name="seniority" id="seniority-select" onChange={onSeniorityChange} value={seniorityActual}>
            <option value="todos">Todos los niveles</option>
            <option value="Trainee">Trainee</option>
            <option value="Junior">Junior</option>
            <option value="Semi Senior">Semi-Senior</option>
            <option value="Senior">Senior</option>
        </select>
        <fieldset>
            <legend>Modalidad</legend>
            <input type="checkbox" value="todas" id="modalidad-todas" name='todas' onChange={handleDebugChange}/>
            <label htmlFor="modalidad-todas">Todas</label>
            <input type="checkbox" value="remoto" id="modalidad-remoto" name='remoto' onChange={handleDebugChange}/>
            <label htmlFor="modalidad-remoto">Remoto</label>
            <input type="checkbox" value="hibrido"id="modalidad-hibrido" input='hibrido' onChange={handleDebugChange}/>
            <label htmlFor="modalidad-hibrido">Hibrido</label>
            <input type="checkbox" value="presencial"id="modalidad-presencial" name='presencial' onChange={handleDebugChange}/>
            <label htmlFor="modalidad-presencial" >Presencial</label>
        </fieldset>
    </section>
  )
}

export default Filters