import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Inicio from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import LaCria from './pages/LaCria';
import Maternales from './pages/Maternales';
import Padrillos from './pages/Padrillos';
import Ventas from './pages/Ventas';
import HorseDetail from './pages/HorseDetail';
import Contacto from './pages/Contacto';
import Subastas from './pages/Subastas';

export { horses } from './data/horses.js';

export function render(url) {
  return renderToStaticMarkup(
    <StaticRouter location={url}>
      <LanguageProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/la-cria" element={<LaCria />} />
          <Route path="/la-cria/maternales" element={<Maternales />} />
          <Route path="/la-cria/padrillos" element={<Padrillos />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/ventas/:id" element={<HorseDetail />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/subastas" element={<Subastas />} />
        </Routes>
        <Footer />
      </LanguageProvider>
    </StaticRouter>
  );
}
