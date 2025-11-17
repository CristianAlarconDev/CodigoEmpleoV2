import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Rutas from './routes/Rutas';
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container mx-auto mt-7">
        <Rutas />
      </main>
      <Footer/>
    </BrowserRouter>
  );
};
export default App;