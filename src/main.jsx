import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AutenticacionProvider } from './context/AutenticacionContext.jsx';
import { CursosProvider } from './context/CursosContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AutenticacionProvider>
    <CursosProvider>
      <App/>
    </CursosProvider>
    </AutenticacionProvider>
  </React.StrictMode>,
)