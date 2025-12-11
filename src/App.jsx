import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Rutas from './routes/Rutas';

const App = () => {
  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex-grow">
        <Rutas />
      </main>
      <Footer/>
      </div>
    </BrowserRouter>
  );
};
export default App;