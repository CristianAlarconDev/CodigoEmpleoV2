import React from 'react'
import styles from './Filters.module.css'
const Filters = ({filtrosSeleccionados,onFiltroChange}) => {
    /*const handleDebugChange = (event) => {
    
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

*/



/*handleDebugChange */
  return (
    /*Contenedor general */
    <section className={styles.container}>
        <h2 className={styles.title}>Filtros</h2>
        <div className={styles.formGroup}>
          <label htmlFor="seniority-select" className={styles.legend}> Seniority</label>
          <select className={styles.select} name="seniority" id="seniority-select" onChange={onFiltroChange} value={filtrosSeleccionados.seniority}>
            <option value="todos">Todos</option>
            <option value="Trainee">Trainee</option>
            <option value="Junior">Junior</option>
            <option value="Semi Senior">Semi-Senior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        
        <fieldset className={styles.fieldsetGroup}>
          <legend className={styles.legend}>Modalidad</legend>
          <div className={styles.checkboxWrapper}>
            <input className={styles.checkbox} type="checkbox" value="remoto" id="modalidad-remoto" name='remoto' onChange={onFiltroChange} checked={filtrosSeleccionados.remoto}/>
            <label htmlFor="modalidad-remoto">Remoto</label>
          </div>
          <div className={styles.checkboxWrapper}>
            <input className={styles.checkbox} type="checkbox" value="hibrido"id="modalidad-hibrido" name='hibrido' onChange={onFiltroChange}checked={filtrosSeleccionados.hibrido}/>
            <label htmlFor="modalidad-hibrido">Hibrido</label>
          </div>
          <div className={styles.checkboxWrapper}>
            <input className={styles.checkbox} type="checkbox" value="presencial"id="modalidad-presencial" name='presencial' onChange={onFiltroChange}checked={filtrosSeleccionados.presencial}/>
            <label htmlFor="modalidad-presencial" >Presencial</label>
          </div>
        </fieldset>
    </section>
  )
}

export default Filters