import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { horses } from '@/data/horses';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FilterBar from '@/components/ui/FilterBar';
import HorseCard from '@/components/ui/HorseCard';
import SEOMeta from '@/components/layout/SEOMeta';

/* ─── Hero ─── */

function HeroSection({ t }) {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowScroll(window.scrollY < 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img loading="eager" decoding="async" fetchpriority="high"
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      {/* Layer 1 — Base dark veil */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      {/* Layer 2 — Bottom-up gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
      {/* Layer 3 — Top-down fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
      {/* Layer 4 — Radial vignette behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(0,0,0,0.55) 0%, transparent 70%)'
        }}
      />
      <div className="noise-overlay absolute inset-0" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="mb-6 font-body text-xs tracking-[0.4em] uppercase text-gold"
        >
          {t('ventas.hero_label')}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-display uppercase text-5xl tracking-[0.08em] text-white sm:text-7xl lg:text-8xl"
          style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}
        >
          {t('ventas.hero_title')}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-4 font-heading uppercase text-xl font-light text-white/80"
          style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}
        >
          {t('ventas.hero_subtitle')}
        </motion.p>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex items-center gap-3 font-body text-sm text-white/60"
        >
          <span>{t('ventas.stat_1')}</span>
          <span className="text-gold">·</span>
          <span>{t('ventas.stat_2')}</span>
          <span className="text-gold">·</span>
          <span>{t('ventas.stat_3')}</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
          >
            <span className="font-body text-xs tracking-[0.4em] text-white/50">
              {t('hero.scroll')}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Page ─── */

export default function Ventas() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    sex: '',
    age: '',
    color: '',
  });

  const filteredHorses = useMemo(() => {
    return horses.filter((h) => {
      if (filters.sex && h.sex !== filters.sex) return false;

      if (filters.age) {
        const [min, max] = filters.age.split('-').map(Number);
        if (h.age < min || h.age > max) return false;
      }

      if (filters.color && h.color !== filters.color) return false;

      return true;
    });
  }, [filters]);

  return (
    <main>
      <SEOMeta
        title="Caballos en Venta"
        description="40 ejemplares disponibles para adquisición. Polo ponies de alto rendimiento, exportación certificada."
      />
      <HeroSection t={t} />

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        resultCount={filteredHorses.length}
      />

      <section className="section-padding bg-transparent">
        <div className="container-custom">
          {filteredHorses.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredHorses.map((horse, i) => (
                <HorseCard
                  key={horse.id}
                  horse={horse}
                  delay={Math.min(i * 0.05, 0.3)}
                />
              ))}
            </div>
          ) : (
            <AnimatedSection className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.05]">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 3L5 9v9c0 8.5 5.5 16.4 13 18.3 7.5-1.9 13-9.8 13-18.3V9L18 3z"
                    stroke="#c9a84c"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path d="M12 18h12M18 12v12" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-body text-lg text-gray-400">
                {t('ventas.filter_empty')}
              </p>
              <button
                onClick={() => setFilters({ sex: '', age: '', color: '' })}
                className="mt-6 rounded-full border border-gold/40 px-8 py-3 font-body text-xs uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-black"
              >
                {t('ventas.filter_reset')}
              </button>
            </AnimatedSection>
          )}
        </div>
      </section>
    </main>
  );
}
