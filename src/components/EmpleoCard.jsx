import React from 'react'
import styles from './EmpleoCard.module.css'
import { Link } from 'react-router-dom';
const EmpleoCard = (props) => {
    /* Revisar si esto mejor llevarlo a otro lado, desestructure todo*/
    const {titulo, empresa, ubicacion, salario, descripcion,
        modalidad, seniority, _id}=props.dataEmpleo;
    

return (
    <article className={styles.card}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h3 className={styles.title}>{titulo}</h3>
                    
                    <p className={styles.subtitle}>{empresa} - {modalidad}</p>
                </header>
                <p className={styles.description}>{descripcion}</p>
                <ul className={styles.metadata}>
                    <li>{ubicacion}</li>
                    <li>{salario}</li>
                    <li>{seniority}</li>
                </ul>
            </div>
            <footer className={styles.footer}>
                <Link 
                    to={`/empleo/${_id}`} 
                    className={styles.button}
                >
                    Ver oferta
                </Link>
            </footer>
        </article>
        )
}

export default EmpleoCard