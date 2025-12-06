import { useState, useEffect } from "react";

export const useFetch = (urlEndpoint) => {
    const [data, setData] = useState([]);
    const [cargando, setCargando] = useState(true);
    

    useEffect(() => {
        if (!urlEndpoint) {
            console.warn("useFetch se llamó sin URL");
            setCargando(false);
            return;
        }
        const fetchMockApi = async () => {
            try {
                const response = await fetch(urlEndpoint);
                if (!response.ok) {
                    throw new Error(`Ocurrió el error: ${response.status}`);
                }
                const responseJson = await response.json();
                setData(responseJson);
            } catch (err) {
                console.error("Error al cargar empleos:", err);
                
            } finally {
                setCargando(false);
            }
        };
        /*Recordar para evitar se llame constantemente */
        fetchMockApi();
    }, [urlEndpoint]); 

        return { data, cargando};
    };