import { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { autenticacion } from '../config/firebase';
const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(autenticacion, async (firebaseUser) => {
        if (firebaseUser) {
        //console.log("Firebase UID:", firebaseUser.uid);
        
        try {
            // BUSCO EN ENDPOINT USUARIOS EL CAMPO firebase_uid 
            const response = await fetch(`${import.meta.env.VITE_MOCKAPI_ENDPOINT_USERS}?firebase_uid=${firebaseUser.uid}`);
            
            if (!response.ok) throw new Error("Error fetching usuarios de mockapi");
            
            const data = await response.json();

            if (data && data.length > 0) {
                //EL USUARIO YA ESTABA EN MOCKAPI ASI QUE CON EL ''GET'' FUE SUFICIENTE
                console.log("Usuario encontrado en MockAPI");
                
                const dbUser = data[0]; 
                setUsuario({ ...firebaseUser, ...dbUser });

            } else {
                //EL USUARIO NO ESTABA EN MOCKAPI, DEBERIA GUARDAR SU ID Y DATOS BASICOS PARA LUEGO SI SE 
                // LOGUEA DE NUEVO TRAER SUS PREFERNCIAS
                console.warn(" Usuario no encontrado en MockAPI (Es nuevo)");
                
                const userTemplate = {
                    ...firebaseUser, 
                    cursos_guardados: [],
                    empleos_guardados: [],
                    postulaciones: [],
                    rol: 'usuario' 
                };

                console.log("DATA PARA CREAR MANUALMENTE 'POST'EN MOCKAPI:", {
                    firebase_uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    nombre: firebaseUser.displayName,
                    cursos_guardados: [],
                    empleos_guardados: [],
                    postulaciones: []
                });
                setUsuario(userTemplate);
            }

        } catch (error) {
            console.error(" Error conectando con MockAPI:", error);
            //SOLO USO EL USER DE FIRBASE SI NO SE CONECTO A MOCKAPI PARA COMPARAR, DEBE TRATARSE DIFERENTE ESTO LUEGO
            setUsuario(firebaseUser);
        }

        } else {
        //LOGOUT
        setUsuario(null);
        }
    });

    return () => unsubscribe();
    }, []);

    return (
        <UsuarioContext.Provider value={{usuario}}>
            {children}
        </UsuarioContext.Provider>
    );
}
const useUsuarioContext = () => {
    const context = useContext(UsuarioContext);
    if (context === undefined) {
        throw new Error('useUsuarioContext debe ser usado dentro de un UsuarioProvider');
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { UsuarioProvider, useUsuarioContext };
export default UsuarioContext;