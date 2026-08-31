import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SEOMeta from '@/components/layout/SEOMeta';

const maternalLines = [
  {
    image: '/assets/horses/total-gonna.webp',
    nameKey: 'maternales.line_1_name',
    originKey: 'maternales.line_1_origin',
    descKey: 'maternales.line_1_desc',
    traitsKey: 'maternales.line_1_traits',
    offspringKey: 'maternales.line_1_offspring',
  },
  {
    image: '/assets/horses/total-lola.webp',
    nameKey: 'maternales.line_2_name',
    originKey: 'maternales.line_2_origin',
    descKey: 'maternales.line_2_desc',
    traitsKey: 'maternales.line_2_traits',
    offspringKey: 'maternales.line_2_offspring',
  },
  {
    image: '/assets/horses/total-eclipse.webp',
    nameKey: 'maternales.line_3_name',
    originKey: 'maternales.line_3_origin',
    descKey: 'maternales.line_3_desc',
    traitsKey: 'maternales.line_3_traits',
    offspringKey: 'maternales.line_3_offspring',
  },
  {
    image: '/assets/horses/total-sachenca.webp',
    nameKey: 'maternales.line_4_name',
    originKey: 'maternales.line_4_origin',
    descKey: 'maternales.line_4_desc',
    traitsKey: 'maternales.line_4_traits',
    offspringKey: 'maternales.line_4_offspring',
  },
  {
    image: '/assets/horses/total-rayo.webp',
    nameKey: 'maternales.line_5_name',
    originKey: 'maternales.line_5_origin',
    descKey: 'maternales.line_5_desc',
    traitsKey: 'maternales.line_5_traits',
    offspringKey: 'maternales.line_5_offspring',
  },
  {
    image: '/assets/horses/total-malva.webp',
    nameKey: 'maternales.line_6_name',
    originKey: 'maternales.line_6_origin',
    descKey: 'maternales.line_6_desc',
    traitsKey: 'maternales.line_6_traits',
    offspringKey: 'maternales.line_6_offspring',
  },
];

/* ─── Section Components ─── */

function HeroSection({ t }) {
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
    <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img decoding="async" loading="eager" fetchpriority="high"
          src="/assets/horses/total-lola.webp"
          alt="Yegua madre de polo en el establecimiento Total Equines"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Layer 1 — Base dark veil (lighter for 60vh) */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      {/* Layer 2 — Bottom-up gradient (lighter for 60vh) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
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
          {t('maternales.hero_label')}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-display uppercase text-4xl tracking-[0.08em] text-white sm:text-7xl lg:text-8xl"
          style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}
        >
          {t('maternales.hero_title')}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-4 font-heading uppercase text-xl font-light text-white/80"
          style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}
        >
          {t('maternales.hero_subtitle')}
        </motion.p>
      </motion.div>
    </section>
  );
}

function IntroSection({ t }) {
  return (
    <section className="bg-transparent py-16">
      <div className="container-custom">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="font-body text-lg text-gray-300">
            {t('maternales.intro_text')}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function MaternalLineCard({ line, index, t }) {
  const traits = t(line.traitsKey).split(', ');

  return (
    <AnimatedSection delay={index * 0.1}>
      <div className="group overflow-hidden rounded-3xl border border-gold/20 bg-white/[0.05] backdrop-blur-sm">
        <div className="relative aspect-video overflow-hidden">
          <img decoding="async" loading="lazy"
            src={line.image}
            alt={t(line.nameKey)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading uppercase text-xl font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
              {t(line.nameKey)}
            </h3>
            <span className="flex-shrink-0 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-body text-xs text-gold">
              {t(line.originKey)}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {traits.map((trait) => (
              <span
                key={trait}
                className="rounded-full bg-white/[0.08] px-3 py-1 font-body text-xs text-gray-300"
              >
                {trait}
              </span>
            ))}
          </div>

          <p className="mt-3 font-body text-sm leading-relaxed text-gray-400">
            {t(line.descKey)}
          </p>

          <p className="mt-4 font-body text-xs uppercase tracking-widest text-gold">
            {t('maternales.offspring_label')}
          </p>
          <p className="mt-1 font-body text-sm text-gray-300">
            {t(line.offspringKey)}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

function MaternalLinesGrid({ t }) {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {maternalLines.map((line, i) => (
            <MaternalLineCard key={i} line={line} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */

export default function Maternales() {
  const { t } = useTranslation();

  return (
    <main>
      <SEOMeta
        title="Líneas Maternas"
        description="Las mejores yeguas madres del polo argentino. Genética de élite para la cría de caballos de alto rendimiento."
      />
      <HeroSection t={t} />
      <IntroSection t={t} />
      <MaternalLinesGrid t={t} />
    </main>
  );
}
