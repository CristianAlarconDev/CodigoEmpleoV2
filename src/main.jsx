import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AutenticacionProvider } from './context/AutenticacionContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AutenticacionProvider>
      <App/>
    </AutenticacionProvider>
  </React.StrictMode>,
)