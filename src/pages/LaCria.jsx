import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SEOMeta from '@/components/layout/SEOMeta';
import GoldDivider from '@/components/ui/GoldDivider';

/* ─── Data ─── */

const philosophyPillars = [
  { num: '01', titleKey: 'lacria.phil_01_title', textKey: 'lacria.phil_01_text' },
  { num: '02', titleKey: 'lacria.phil_02_title', textKey: 'lacria.phil_02_text' },
  { num: '03', titleKey: 'lacria.phil_03_title', textKey: 'lacria.phil_03_text' },
  { num: '04', titleKey: 'lacria.phil_04_title', textKey: 'lacria.phil_04_text' },
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
      <div className="absolute inset-0">
        <img loading="eager" decoding="async" fetchpriority="high"
          src="/assets/horses/total-gonna.webp"
          alt="Programa de cría de caballos de polo en Total Equines, Argentina"
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
        className="relative z-10 flex h-full flex-col items-center justify-center px-6"
      >
        <motion.p
          variants={fadeUp}
          className="mb-6 font-body text-xs tracking-[0.4em] uppercase text-gold"
        >
          {t('lacria.hero_label')}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-display uppercase text-4xl tracking-[0.08em] text-white sm:text-7xl lg:text-9xl"
          style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}
        >
          {t('lacria.hero_title')}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-4 font-heading uppercase text-xl font-light text-white/80"
          style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}
        >
          {t('lacria.hero_subtitle')}
        </motion.p>
      </motion.div>

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

function IntroSection({ t }) {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-custom">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <GoldDivider className="mb-10" />
          <p className="font-body text-xl leading-relaxed text-gray-300">
            {t('lacria.intro_text')}
          </p>
          <GoldDivider className="mt-10" />
        </AnimatedSection>
      </div>
    </section>
  );
}

function PathCard({ image, label, title, text, cta, to, direction, t }) {
  return (
    <AnimatedSection direction={direction} className="flex-1">
      <Link to={to} className="group relative block min-h-[360px] cursor-pointer overflow-hidden rounded-3xl">
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <img decoding="async"
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 rounded-3xl bg-black/40 pointer-events-none transition-colors duration-400 group-hover:bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none rounded-3xl" />
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-400 group-hover:border-gold/50" />

        <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end p-6 sm:p-10">
          <span className="mb-3 font-body text-xs tracking-[0.4em] uppercase text-gold">
            {label}
          </span>
          <h3 className="font-display uppercase text-4xl text-white sm:text-5xl" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
            {title}
          </h3>
          <p className="mt-3 font-body text-base text-white/70">
            {text}
          </p>
          <span className="mt-4 font-body text-xs uppercase tracking-widest text-gold">
            {cta} →
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}

function TwoPathsSection({ t }) {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <PathCard
            image="/assets/horses/total-lola.webp"
            label={t('lacria.card1_label')}
            title={t('lacria.card1_title')}
            text={t('lacria.card1_text')}
            cta={t('lacria.card1_cta')}
            to="/la-cria/maternales"
            direction="left"
            t={t}
          />
          <PathCard
            image="/assets/horses/total-eclipse.webp"
            label={t('lacria.card2_label')}
            title={t('lacria.card2_title')}
            text={t('lacria.card2_text')}
            cta={t('lacria.card2_cta')}
            to="/la-cria/padrillos"
            direction="right"
            t={t}
          />
        </div>
      </div>
    </section>
  );
}

function PhilosophySection({ t }) {
  return (
    <section className="section-padding section-tint">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {philosophyPillars.map((pillar, i) => (
            <AnimatedSection key={pillar.num} delay={i * 0.1}>
              <div className="rounded-2xl border border-gold/15 bg-white/[0.04] backdrop-blur-sm p-8">
                <span className="font-display uppercase text-3xl sm:text-5xl text-gold/30" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
                  {pillar.num}
                </span>
                <h3 className="mt-3 font-heading uppercase text-xl font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
                  {t(pillar.titleKey)}
                </h3>
                <p className="mt-3 font-body text-base leading-relaxed text-gray-400">
                  {t(pillar.textKey)}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */

export default function LaCria() {
  const { t } = useTranslation();

  return (
    <main>
      <SEOMeta
        title="Programa de Cría"
        description="Líneas maternas y padrillos de élite. El programa de cría más exigente del polo argentino."
      />
      <HeroSection t={t} />
      <IntroSection t={t} />
      <TwoPathsSection t={t} />
      <PhilosophySection t={t} />
    </main>
  );
}
