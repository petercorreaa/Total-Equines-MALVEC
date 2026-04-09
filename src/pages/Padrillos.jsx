import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SEOMeta from '@/components/layout/SEOMeta';

const stallions = [
  {
    image: 'https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?w=1200&q=80',
    nameKey: 'padrillos.s_1_name',
    originKey: 'padrillos.s_1_origin',
    breedKey: 'padrillos.s_1_breed',
    descKey: 'padrillos.s_1_desc',
    handicapKey: 'padrillos.s_1_handicap',
    descendantsKey: 'padrillos.s_1_descendants',
    successKey: 'padrillos.s_1_success',
    breedingKeys: ['padrillos.s_1_b1', 'padrillos.s_1_b2', 'padrillos.s_1_b3'],
  },
  {
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&q=80',
    nameKey: 'padrillos.s_2_name',
    originKey: 'padrillos.s_2_origin',
    breedKey: 'padrillos.s_2_breed',
    descKey: 'padrillos.s_2_desc',
    handicapKey: 'padrillos.s_2_handicap',
    descendantsKey: 'padrillos.s_2_descendants',
    successKey: 'padrillos.s_2_success',
    breedingKeys: ['padrillos.s_2_b1', 'padrillos.s_2_b2', 'padrillos.s_2_b3'],
  },
  {
    image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=1200&q=80',
    nameKey: 'padrillos.s_3_name',
    originKey: 'padrillos.s_3_origin',
    breedKey: 'padrillos.s_3_breed',
    descKey: 'padrillos.s_3_desc',
    handicapKey: 'padrillos.s_3_handicap',
    descendantsKey: 'padrillos.s_3_descendants',
    successKey: 'padrillos.s_3_success',
    breedingKeys: ['padrillos.s_3_b1', 'padrillos.s_3_b2', 'padrillos.s_3_b3'],
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    nameKey: 'padrillos.s_4_name',
    originKey: 'padrillos.s_4_origin',
    breedKey: 'padrillos.s_4_breed',
    descKey: 'padrillos.s_4_desc',
    handicapKey: 'padrillos.s_4_handicap',
    descendantsKey: 'padrillos.s_4_descendants',
    successKey: 'padrillos.s_4_success',
    breedingKeys: ['padrillos.s_4_b1', 'padrillos.s_4_b2', 'padrillos.s_4_b3'],
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
          src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=1920&q=80"
          alt=""
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
          {t('padrillos.hero_label')}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-display uppercase text-4xl tracking-[0.08em] text-white sm:text-7xl lg:text-8xl"
          style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}
        >
          {t('padrillos.hero_title')}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-4 font-heading uppercase text-xl font-light text-white/80"
          style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}
        >
          {t('padrillos.hero_subtitle')}
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
            {t('padrillos.intro_text')}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function StallionCard({ stallion, index, t }) {
  const stats = [
    { label: t('padrillos.stat_handicap'), value: t(stallion.handicapKey) },
    { label: t('padrillos.stat_descendants'), value: t(stallion.descendantsKey) },
    { label: t('padrillos.stat_success'), value: t(stallion.successKey) },
  ];

  return (
    <AnimatedSection delay={index * 0.15}>
      <div className="group overflow-hidden rounded-3xl border border-gold/20 bg-white/[0.05] backdrop-blur-sm">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img decoding="async" loading="lazy"
            src={stallion.image}
            alt={t(stallion.nameKey)}
            className="h-full w-full object-cover transition-transform duration-600 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
        </div>

        <div className="p-4 sm:p-8">
          <h3 className="font-display uppercase text-4xl tracking-[0.05em] text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
            {t(stallion.nameKey)}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-body text-xs text-gold">
              {t(stallion.originKey)}
            </span>
            <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-body text-xs text-gold">
              {t(stallion.breedKey)}
            </span>
          </div>

          <div className="my-4 h-0.5 w-10 rounded-full bg-gold" />

          <p className="font-body text-base leading-relaxed text-gray-300">
            {t(stallion.descKey)}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-body text-xs uppercase tracking-widest text-gray-500">
                  {stat.label}
                </p>
                <p className="mt-1 font-heading uppercase text-xl font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="font-body text-xs tracking-[0.3em] text-gold">
              {t('padrillos.breeding_label')}
            </p>
            <ul className="mt-2 space-y-1">
              {stallion.breedingKeys.map((key) => (
                <li key={key} className="font-body text-sm text-gray-400">
                  • {t(key)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function StallionsGrid({ t }) {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {stallions.map((stallion, i) => (
            <StallionCard key={i} stallion={stallion} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */

export default function Padrillos() {
  const { t } = useTranslation();

  return (
    <main>
      <SEOMeta
        title="Padrillos"
        description="Nuestros padrillos de élite. Las mejores líneas genéticas del polo argentino."
      />
      <HeroSection t={t} />
      <IntroSection t={t} />
      <StallionsGrid t={t} />
    </main>
  );
}
