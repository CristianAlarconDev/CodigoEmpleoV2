import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { autenticacion, googleProvider } from '../config/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Code, LogIn } from 'lucide-react'; // Importamos iconos

const LoginPage = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(autenticacion, googleProvider);
            console.log("Login exitoso");
            navigate('/perfil');
        } catch (error) {
            console.error("Error en login:", error.message);
        }
    };

    return (
        <div className=" container mx-auto p-4 mt-6 min-h-screen flex items-center justify-center bg-gray-50 px-4">
            
            {/* Tarjeta Principal */}
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                
                {/* Cabecera Azul */}
                <div className="bg-gray-900 p-8 text-center">
                    <div className="mx-auto bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <Code className="text-blue-500" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">¡Bienvenido de nuevo!</h2>
                    <p className="text-gray-400 text-sm">Accede a tu panel de control personal</p>
                </div>

                {/* Cuerpo del Login */}
                <div className="p-8">
                    <div className="mb-6 text-center">
                        <p className="text-gray-600 mb-6 text-sm">
                            Inicia sesión para guardar tus cursos favoritos, gestionar postulaciones y más.
                        </p>

                        {/* Botón Google Mejorado */}
                        <button 
                            type='button' 
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-blue-400 transition-all shadow-sm hover:shadow-md group"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
                            <span>Continuar con Google</span>
                        </button>
                    </div>

                    {/* Separador */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-400">¿No tienes cuenta?</span>
                        </div>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        No te preocupes, se creará automáticamente al iniciar sesión con Google.
                    </p>
                </div>
                
                {/* Footer Tarjeta */}
                <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                    <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1">
                        &larr; Volver al inicio
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default LoginPage;