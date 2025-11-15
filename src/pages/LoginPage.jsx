import React from 'react'

const LoginPage = () => {

    const googleLogin = () => {
        // Lógica para iniciar sesión con Google
        console.log("Iniciar sesión con Google");
    }



  return (
    <section>
        <section>
            <h2>Iniciar Sesion</h2>
            <p>Inicia sesión para guardar tus postulaciones.</p>
        </section>
        
        <section>
            <button type='button' onClick={googleLogin}>
                Continuar con Google
            </button>
        </section>
            
    </section>
  )
}

export default LoginPage