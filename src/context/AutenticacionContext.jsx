import { createContext, useState,useEffect, useContext } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { autenticacion } from '../config/firebase';
// 1. Usamos el nombre del archivo, quitando 'Context' si lo tiene al final.
const AutenticacionContext = createContext();

export const AutenticacionProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const administradores = import.meta.env.VITE_ADMINISTRADORES || "";
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
    
    useEffect(() => {
        /*abro el 'listener' */
        const unsubscribe = onAuthStateChanged(autenticacion, (usuarioEnFirebase) => {
            if (usuarioEnFirebase) {
                const datosUsuario = {
                    nombre: usuarioEnFirebase.displayName,
                    email: usuarioEnFirebase.email,
                    fotoURL: usuarioEnFirebase.photoURL,
                    uid: usuarioEnFirebase.uid
                };
                setUsuario(datosUsuario);
            } else {
                setUsuario(null);
            }
        });
        /*cerrar el 'listener', recomendado por si se desomanta seguido el componente;
        mismo funcioamiento */
        return () => unsubscribe();
    }, []);

    const logout = () => signOut(autenticacion);
    const data = {
        usuario,
        logout,
        esAdmin
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
