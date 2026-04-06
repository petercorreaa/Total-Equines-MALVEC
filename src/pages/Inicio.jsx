import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import HorseCard from '@/components/ui/HorseCard';
import CertificationCarousel from '@/components/ui/CertificationCarousel';
import SEOMeta from '@/components/layout/SEOMeta';
import HeroVideo from '@/components/ui/HeroVideo';

/* ─── Data ─── */

const previewHorses = [
  {
    id: 'bravo-de-canuelas',
    name: 'Bravo de Cañuelas',
    age: 7,
    sex: 'Castrado',
    color: 'Zaino',
    heightHH: 15.1,
    price: 18000,
    images: [
      'https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?w=600&q=80',
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80',
      'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80'
    ]
  },
  {
    id: 'la-mora-iv',
    name: 'La Mora IV',
    age: 5,
    sex: 'Yegua',
    color: 'Tordillo',
    heightHH: 14.3,
    price: 24000,
    images: [
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80',
      'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
    ]
  },
  {
    id: 'tempestad-del-sur',
    name: 'Tempestad del Sur',
    age: 6,
    sex: 'Yegua',
    color: 'Alazán',
    heightHH: 15.0,
    price: null,
    images: [
      'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?w=600&q=80'
    ]
  }
];

/* ─── Section Components ─── */

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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <HeroVideo
        fallbackImage="https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?w=1920&q=80"
      />

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

      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0" />

      {/* Main content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex h-full flex-col items-center justify-center px-6"
        style={{ paddingTop: '0', marginTop: '-10vh' }}
      >
        {/* Label */}
        <motion.p
          variants={fadeUp}
          className="mb-6 font-body text-xs tracking-[0.4em] text-gold uppercase"
        >
          {t('hero.label')}
        </motion.p>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="font-display uppercase text-5xl tracking-[0.08em] text-white sm:text-7xl lg:text-9xl"
          style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}
        >
          {t('hero.title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-4 font-heading uppercase text-xl font-light tracking-normal text-white/80 sm:text-2xl"
          style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}
        >
          {t('hero.subtitle')}
        </motion.p>

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

      {/* Bottom left — EST */}
      <div className="absolute bottom-10 left-8 z-10">
        <span className="font-body text-xs tracking-widest text-white/30">
          {t('hero.est')}
        </span>
      </div>

      {/* Bottom right — social icons */}
      <div className="absolute bottom-10 right-8 z-10 flex items-center gap-4">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white/50 transition-colors duration-300 hover:text-gold"
        >
          <FaInstagram className="h-4 w-4" />
        </a>
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="text-white/50 transition-colors duration-300 hover:text-gold"
        >
          <FaWhatsapp className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function IntroSection({ t }) {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-custom">
        <GoldDivider className="mb-16" />

        <AnimatedSection className="mx-auto max-w-[900px] text-center">
          <h2 className="font-heading uppercase text-3xl font-light leading-relaxed text-white sm:text-4xl lg:text-5xl" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
            {/* Split the quote to highlight "Total Equines" */}
            {t('inicio.intro_quote').split('Total Equines').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-gradient-gold">Total Equines</span>
                )}
              </span>
            ))}
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mx-auto mt-10 max-w-2xl text-center">
          <p className="font-body text-lg leading-relaxed text-gray-400">
            {t('inicio.intro_text')}
          </p>
        </AnimatedSection>

        <GoldDivider className="mt-16" />
      </div>
    </section>
  );
}

function CriaColumn({ image, label, title, text, cta, to, direction }) {
  return (
    <AnimatedSection
      direction={direction}
      className="group relative min-h-[500px] overflow-hidden lg:min-h-[600px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img decoding="async" loading="lazy"
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
      <div className="relative z-10 flex h-full min-h-[500px] flex-col items-center justify-center px-8 text-center lg:min-h-[600px]">
        <span className="mb-4 font-body text-xs tracking-[0.4em] uppercase text-gold">
          {label}
        </span>
        <h3 className="font-display uppercase text-4xl tracking-[0.05em] text-white sm:text-5xl" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
          {title}
        </h3>
        <p className="mt-4 max-w-sm font-body text-base text-white/70">
          {text}
        </p>
        <Link
          to={to}
          className="mt-6 font-body text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light hover:underline"
        >
          {cta} →
        </Link>
      </div>
    </AnimatedSection>
  );
}

function CriaPreviewSection({ t }) {
  return (
    <section className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <CriaColumn
          image="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&q=80"
          label={t('inicio.cria_label')}
          title={t('inicio.cria_maternales_title')}
          text={t('inicio.cria_maternales_text')}
          cta={t('inicio.cria_cta')}
          to="/la-cria/maternales"
          direction="left"
        />
        <CriaColumn
          image="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=1200&q=80"
          label={t('inicio.cria_label')}
          title={t('inicio.cria_padrillos_title')}
          text={t('inicio.cria_padrillos_text')}
          cta={t('inicio.cria_cta')}
          to="/la-cria/padrillos"
          direction="right"
        />
      </div>
    </section>
  );
}

function VentasPreviewSection({ t }) {
  return (
    <section className="section-padding section-tint">
      {/* Header */}
      <AnimatedSection className="mb-14 text-center">
        <span className="mb-4 inline-block font-body text-xs tracking-[0.4em] uppercase text-gold">
          {t('inicio.ventas_label')}
        </span>
        <h2 className="font-display uppercase text-5xl tracking-[0.05em] text-white sm:text-6xl" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
          {t('inicio.ventas_title')}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray-400">
          {t('inicio.ventas_subtitle')}
        </p>
      </AnimatedSection>

      {/* 3-column grid using HorseCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {previewHorses.map((horse, index) => (
          <AnimatedSection key={horse.id} delay={index * 0.1} direction="up">
            <HorseCard horse={horse} />
          </AnimatedSection>
        ))}
      </div>

      {/* CTA */}
      <AnimatedSection delay={0.3} className="mt-14 text-center">
        <Link
          to="/ventas"
          className="inline-block rounded-full border border-gold px-10 py-4 font-body text-sm uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-black"
        >
          {t('inicio.ventas_ver_todos')}
        </Link>
      </AnimatedSection>
    </section>
  );
}

/* ─── Page ─── */

export default function Inicio() {
  const { t } = useTranslation();

  return (
    <main>
      <SEOMeta
        title="Caballos de Polo de Élite"
        description="Criamos los mejores caballos de polo de Argentina. Genética de élite, crianza profesional y venta nacional e internacional."
      />
      <HeroSection t={t} />
      <IntroSection t={t} />
      <CriaPreviewSection t={t} />
      <VentasPreviewSection t={t} />
      <CertificationCarousel />
    </main>
  );
}
