import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { LanguageProvider } from '@/context/LanguageContext';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/layout/LoadingScreen';
import PageTransition from '@/components/layout/PageTransition';
import BackToTop from '@/components/ui/BackToTop';
import Maintenance from '@/components/layout/Maintenance';

// Site-wide gate: the client isn't ready to launch yet, so every route shows
// the maintenance screen instead. Flip to false (or delete this block and the
// early return below) when told to bring the site back up.
const MAINTENANCE_MODE = true;

const Inicio = lazy(() => import('@/pages/Inicio'));
const Nosotros = lazy(() => import('@/pages/Nosotros'));
const LaCria = lazy(() => import('@/pages/LaCria'));
const Maternales = lazy(() => import('@/pages/Maternales'));
const Padrillos = lazy(() => import('@/pages/Padrillos'));
const Ventas = lazy(() => import('@/pages/Ventas'));
const HorseDetail = lazy(() => import('@/pages/HorseDetail'));
const Contacto = lazy(() => import('@/pages/Contacto'));
const Subastas = lazy(() => import('@/pages/Subastas'));

const SuspenseFallback = (
  <div className="flex h-screen w-full items-center justify-center bg-black">
    <div className="h-16 w-16 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Inicio /></PageTransition>} />
        <Route path="/nosotros" element={<PageTransition><Nosotros /></PageTransition>} />
        <Route path="/la-cria" element={<PageTransition><LaCria /></PageTransition>} />
        <Route path="/la-cria/maternales" element={<PageTransition><Maternales /></PageTransition>} />
        <Route path="/la-cria/padrillos" element={<PageTransition><Padrillos /></PageTransition>} />
        <Route path="/ventas" element={<PageTransition><Ventas /></PageTransition>} />
        <Route path="/ventas/:id" element={<PageTransition><HorseDetail /></PageTransition>} />
        <Route path="/contacto" element={<PageTransition><Contacto /></PageTransition>} />
        <Route path="/subastas" element={<PageTransition><Subastas /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  if (MAINTENANCE_MODE) {
    return <Maintenance />;
  }

  return (
    <BrowserRouter>
      <LanguageProvider>
        <LazyMotion features={domAnimation}>
          <LoadingScreen />
          <ScrollToTop />
          <Navbar />
          <Suspense fallback={SuspenseFallback}>
            <AnimatedRoutes />
          </Suspense>
          <Footer />
          <BackToTop />
        </LazyMotion>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
