import { useFetch } from '../hooks/useFetch';
import { useParams, Link } from 'react-router-dom';
import styles from './EmpleoCard.module.css'; 

const EmpleoCardFull = () => {
  const { id } = useParams();
  
  const url = `${import.meta.env.VITE_MOCKAPI_ENDPOINT_EMPLEOS}/${id}`;

  const { data: empleo, cargando } = useFetch(url);

  if (cargando) return <div className="p-4 text-center">Cargando detalles...</div>;

  if (!empleo) return <div className="p-4 text-center">No se encontró el empleo.</div>;
  /*misma idea que empleo card basica, solo se suma la idea de use params para el id y la 'redireccion 
  al componente nuevo, ademas se suma la idea del use fetch para que siempre se tenga la info actualziada 
  al ingresar al detalle de un empleo'*/
  /*luego se va a cambiar la estructura cuando traiga info del backend */
  return (
    <div className="container-detalle" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      
        <div style={{ marginBottom: '1rem' }}>
            <Link to="/empleos" style={{ textDecoration: 'none', color: '#555' }}>
              &larr; Volver al listado de empleos
            </Link>
        </div>

        <article className={styles.card} style={{ maxWidth: '100%', height: 'auto' }}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.title} style={{ fontSize: '2rem' }}>{empleo.titulo}</h1>
                    <p className={styles.subtitle} style={{ fontSize: '1.2rem' }}>
                        {empleo.empresa} - {empleo.modalidad}
                    </p>
                </header>
                
                <hr style={{ margin: '1rem 0', border: '0', borderTop: '1px solid #eee' }}/>

                <div className={styles.description}>
                    <h3>Descripción del puesto</h3>
                    <p style={{ lineHeight: '1.6' }}>{empleo.descripcion}</p>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <h3>Detalles</h3>
                    <ul className={styles.metadata} style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 0 }}>
                        <li><strong>Ubicación:</strong> {empleo.ubicacion}</li>
                        <li><strong>Salario:</strong> {empleo.salario}</li>
                        <li><strong>Seniority:</strong> {empleo.seniority}</li>
                    </ul>
                </div>
            </div>

            <footer className={styles.footer}>
                <button 
                    className={styles.button}
                    onClick={() => alert(`Postulándose al empleo ${id}`)}
                >
                    Postularme
                </button>
            </footer>
        </article>
    </div>
  );
};

export default EmpleoCardFull;