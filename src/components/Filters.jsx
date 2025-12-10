import React from 'react'
import styles from './Filters.module.css'
const Filters = ({filtrosSeleccionados,onFiltroChange}) => {



/*handleDebugChange */
  return (
    /*Contenedor general */
    <section className={styles.container}>
        <h2 className={styles.title}>Filtros</h2>
        <div className={styles.formGroup}>
          <label htmlFor="seniority-select" className={styles.legend}> Seniority</label>
          <select className={styles.select} name="seniority" id="seniority-select" 
          onChange={onFiltroChange} value={filtrosSeleccionados.seniority}>
            <option value="">Todos</option>
            <option value="Trainee">Trainee</option>
            <option value="Junior">Junior</option>
            <option value="Semi Senior">Semi-Senior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="modalidad-select" className={styles.legend}> Modalidad</label>
          <select 
            className={styles.select} 
            name="modalidad" 
            id="modalidad-select" 
            onChange={onFiltroChange} 
            value={filtrosSeleccionados.modalidad}
          >
            <option value="">Todas</option>
            <option value="Presencial">Presencial</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Remoto">Remoto</option>
          </select>
        </div>
    </section>
  )
}

export default Filters