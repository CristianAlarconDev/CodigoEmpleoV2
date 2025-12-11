import { useFetch } from '../hooks/useFetch';
import { useParams, Link } from 'react-router-dom';
import styles from './EmpleoCard.module.css'; 
import { useAutenticacionContext } from '../context/AutenticacionContext';
const EmpleoCardFull = () => {
    const { id } = useParams();
    const { usuario, toggleEmpleo, postularse } = useAutenticacionContext();
    // Verificaciones
    const esFavorito = usuario?.empleos_guardados?.some(e => (e._id === id) || (e === id));
    const yaPostulado = usuario?.postulaciones?.some(p => (p.empleo._id === id) || (p.empleo === id));

    const URLEMPLEO = `${import.meta.env.VITE_API_BASE}/empleos/${id}`;
    const { data: empleo, cargando, error } = useFetch(URLEMPLEO);

    if (cargando) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
    );

    if (error || !empleo) return (
        <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-xl font-bold text-gray-700">No encontramos esa oferta.</h2>
            <p className="text-gray-500 mb-4">Es posible que haya expirado o el enlace sea incorrecto.</p>
            <Link to="/empleos" className="text-blue-600 hover:underline">
                &larr; Volver al listado
            </Link>
        </div>
    );
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
                <div className="flex gap-4 justify-end w-full">
                <button onClick={() => usuario ? toggleEmpleo(id) : alert("Inicia sesión")}
                        className={`px-6 py-3 rounded-lg font-bold border transition-colors ${
                            esFavorito 
                            ? 'bg-gray-800 text-white border-gray-800' 
                            : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                        }`}
                >{esFavorito ? 'Guardado' : 'Guardar'}
                </button>
                <button onClick={() => usuario ? postularse(id) : alert("Inicia sesión")}
                        disabled={yaPostulado}
                        className={`font-bold py-3 px-8 rounded-lg transition-all shadow-md ${
                            yaPostulado 
                            ? 'bg-green-600 text-white opacity-90 cursor-default' // Ya postulado
                            : 'bg-blue-600 hover:bg-blue-700 text-white hover:-translate-y-0.5' // Normal
                        }`}
                >{yaPostulado ? 'Ya Postulado' : 'Postularme ahora'}
                </button>
                </div>
            </footer>
        </article>
    </div>
    );
};

export default EmpleoCardFull;