import { createContext, useState, useContext } from 'react';

// 1. Usamos el nombre del archivo, quitando 'Context' si lo tiene al final.
const AutenticacionContext = createContext();

export const AutenticacionProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

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

    return (
        <AutenticacionContext.Provider value={data}>
            {children}
        </AutenticacionContext.Provider>
    );
}

// 2. Creamos el hook para consumir el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useAutenticacionContext = () => {
    const context = useContext(AutenticacionContext);
    if (context === undefined) {
        throw new Error('useAutenticacionContext debe ser usado dentro de un AutenticacionProvider');
    }
    return context;
}
