import { createContext, useState,useEffect, useContext } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { autenticacion } from '../config/firebase';
// 1. Usamos el nombre del archivo, quitando 'Context' si lo tiene al final.
const AutenticacionContext = createContext();

export const AutenticacionProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargandoAuth, setCargandoAuth] = useState(true);
    const administradores = import.meta.env.VITE_ADMINISTRADORES || "";
    const API_URL = import.meta.env.VITE_API_BASE + "/usuarios";
    /*
    const login = (datosUsuario) => {
        setUsuario(datosUsuario);
    }
    const logout = () => {
        setUsuario(null);
    }
    const data = {
        usuario,
        login,
        logout
    };
*/
    function esAdmin(user){
        if (!user || !user.email) return false;
        return(administradores.includes(user.email))
    }
    const toggleCurso = async (idCurso) => {
        if (!usuario) return;
        try {
            const res = await fetch(`${API_URL}/${usuario.firebase_uid}/favoritos/curso`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idCurso }) // Tu backend espera 'idCurso'
            });
            if (res.ok) {
                const data = await res.json();
                // Actualizo solo el array local
                setUsuario(prev => ({ ...prev, cursos_guardados: data.cursos_guardados }));
            }
        } catch (error) { console.error(error); }
    };

    const toggleEmpleo = async (idEmpleo) => {
        if (!usuario) return;
        try {
            const res = await fetch(`${API_URL}/${usuario.firebase_uid}/favoritos/empleo`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idEmpleo }) // Tu backend espera 'idEmpleo'
            });
            if (res.ok) {
                const data = await res.json();
                setUsuario(prev => ({ ...prev, empleos_guardados: data.empleos_guardados }));
            }
        } catch (error) { console.error(error); }
    };
    
    const postularse = async (idEmpleo) => {
        if (!usuario) return;
        try {
            const res = await fetch(`${API_URL}/${usuario.firebase_uid}/postular`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idEmpleo }) // Tu backend espera 'idEmpleo'
            });
            if (res.ok) {
                const data = await res.json();
                setUsuario(prev => ({ ...prev, postulaciones: data.postulaciones }));
                alert("¡Te has postulado con éxito!");
                return true; // Para tener una bander por si se logro la solicitud
            } else {
                const errorData = await res.json();
                alert(errorData.message); // Mostrar "Ya te has postulado", etc.
                return false;
            }
        } catch (error) { console.error(error); return false; }
    };

    useEffect(() => {
        /*abro el 'listener' */
        const unsubscribe = onAuthStateChanged(autenticacion, async(firebaseUser) => {
        if (firebaseUser) {
            try {
                const res = await fetch(`${API_URL}/${firebaseUser.uid}`);
                if (res.ok) {
                    // SI ESTA EL USUARIO 
                    const dbData = await res.json();
                    
                    // SE FUSIONA LO DE MONGO DESDE FIREBASE
                    setUsuario({ ...firebaseUser, ...dbData }); 
                    console.log(" Usuario cargado desde MongoDB");

                    } else if (res.status === 404) {
                    // SI NO ESTA LO AGREGAMOS AL BACKEND
                    console.warn(" Usuario nuevo, registrando en Backend...");
                        
                    // TENGO QUE REVISAR QUE COINCIDA CON EL SCHEMA
                    const nuevoUsuarioBackend = {
                        firebase_uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        nombre: firebaseUser.displayName || "Usuario Nuevo",
                        imagen: firebaseUser.photoURL, // EN ESPECIAL ESTE CAMPO NO RECUERDO SI ERA IMAGEN
                        rol: "user",
                        cursos_guardados: [],
                        empleos_guardados: [],
                        postulaciones: []
                    };

                    const createRes = await fetch(API_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(nuevoUsuarioBackend)
                    });

                    if (createRes.ok) {
                        const dataCreada = await createRes.json();
                        setUsuario({ ...firebaseUser, ...dataCreada });
                        console.log(" Usuario registrado con éxito en DB");
                    } else {
                            console.error("Error creando usuario en DB", await createRes.text());
                        }
                    }

            } catch (error) {
                console.error(" Error conectando con el Backend:", error);
                //DEJO EL USUARIO BASICO DE FIREBAS AUNQUE NO DEBERIA LLEGAR ACA
                    setUsuario(firebaseUser);
            }
            
        } else {
            setUsuario(null);
        }
            setCargandoAuth(false);
        }
    );
        /*cerrar el 'listener', recomendado por si se desomanta seguido el componente;
        mismo funcioamiento */
        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => signOut(autenticacion);
    const data = {
        usuario,
        cargandoAuth,
        logout,
        esAdmin,toggleCurso, toggleEmpleo, postularse
    }
    return (
        
        <AutenticacionContext.Provider value={data}>
            {children}
        </AutenticacionContext.Provider>
    );
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAutenticacionContext = () => {
    const context = useContext(AutenticacionContext);
    if (context === undefined) {
        throw new Error('useAutenticacionContext debe ser usado dentro de un AutenticacionProvider');
    }
    return context;
}
