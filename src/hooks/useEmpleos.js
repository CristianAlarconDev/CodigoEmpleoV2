import { useState, useEffect } from "react";

export const useEmpleos = () => {
    const [empleos, setEmpleos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const mockApiEmpleos="https://68ee91ccdf2025af78042146.mockapi.io/recursos/empleos"

    useEffect(() => {
        const fetchMockApi = async () => {
            try {
                const response = await fetch(mockApiEmpleos);
                if (!response.ok) {
                    throw new Error(`Ocurrió el error: ${response.status}`);
                }
                const data = await response.json();
                setEmpleos(data);
            } catch (err) {
                console.error("Error al cargar empleos:", err);
                
            } finally {
                setCargando(false);
            }
        };
        /*Recordar para evitar se llame constantemente */
        fetchMockApi();
    }, []); //solo una vez al montar el componente

        return { empleos, cargando};
    };