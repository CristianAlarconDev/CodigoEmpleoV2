import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { autenticacion, googleProvider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const navigate =useNavigate()

    const handleGoogleLogin = async () => {
    try {
        const result =await signInWithPopup(autenticacion, googleProvider);
        
        console.log("Usuario logueado!");
        console.log("Nombre:", result.user.displayName);
        console.log("Email:", result.user.email);
        console.log("Foto URL:", result.user.photoURL);
        console.log("UID:", result.user.uid); 
        navigate('/perfil');
        } catch (error) {
        // manejar errores aca:
        console.error("Error durante el inicio de sesión:", error.message);
    }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <section className="bg-white p-8 rounded-lg shadow-md text-center">
            
            {/* texto */}
            <section className="mb-6"> 
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
                <p className="text-gray-600">Inicia sesión para guardar tus postulaciones.</p>
            </section>
            
            {/* boton, cambiar estilos luego */}
            <section>
            <button type='button' onClick={handleGoogleLogin}
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-white rounded-lg                         
                text-gray-700 font-medium hover:bg-gray-50">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google logo" />
                Continuar con Google
            </button>
            </section>
            </section>
        </section>

    )
}

export default LoginPage