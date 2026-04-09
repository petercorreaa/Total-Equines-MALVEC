import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import SEOMeta from '@/components/layout/SEOMeta';

/* ─── Data ─── */

const timelineItems = [
  { year: '2010', titleKey: 'nosotros.tl_2010_title', textKey: 'nosotros.tl_2010_text' },
  { year: '2013', titleKey: 'nosotros.tl_2013_title', textKey: 'nosotros.tl_2013_text' },
  { year: '2016', titleKey: 'nosotros.tl_2016_title', textKey: 'nosotros.tl_2016_text' },
  { year: '2019', titleKey: 'nosotros.tl_2019_title', textKey: 'nosotros.tl_2019_text' },
  { year: '2022', titleKey: 'nosotros.tl_2022_title', textKey: 'nosotros.tl_2022_text' },
  { year: '2024', titleKey: 'nosotros.tl_2024_title', textKey: 'nosotros.tl_2024_text' },
];

const teamMembers = [
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    nameKey: 'nosotros.team_1_name',
    roleKey: 'nosotros.team_1_role',
    bioKey: 'nosotros.team_1_bio',
  },
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    nameKey: 'nosotros.team_2_name',
    roleKey: 'nosotros.team_2_role',
    bioKey: 'nosotros.team_2_bio',
  },
  {
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    nameKey: 'nosotros.team_3_name',
    roleKey: 'nosotros.team_3_role',
    bioKey: 'nosotros.team_3_bio',
  },
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
          src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?w=1920&q=80"
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
        className="relative z-10 flex h-full flex-col items-center justify-center px-6"
      >
        <motion.p
          variants={fadeUp}
          className="mb-6 font-body text-xs tracking-[0.4em] uppercase text-gold"
        >
          {t('nosotros.hero_label')}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-display uppercase text-4xl tracking-[0.08em] text-white sm:text-7xl lg:text-8xl"
          style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}
        >
          {t('nosotros.hero_title')}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-4 font-heading uppercase text-xl font-light text-white/80"
          style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}
        >
          {t('nosotros.hero_subtitle')}
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

function BrandStorySection({ t }) {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-custom">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-16">
          <AnimatedSection direction="left" className="lg:col-span-3">
            <span className="mb-4 inline-block font-body text-xs tracking-[0.4em] uppercase text-gold">
              {t('nosotros.story_label')}
            </span>
            <h2 className="font-display uppercase text-3xl sm:text-4xl text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
              {t('nosotros.story_title')}
            </h2>
            <div className="my-6 h-0.5 w-16 rounded-full bg-gold" />
            <div className="space-y-6">
              <p className="font-body text-base leading-relaxed text-gray-300">
                {t('nosotros.story_p1')}
              </p>
              <p className="font-body text-base leading-relaxed text-gray-300">
                {t('nosotros.story_p2')}
              </p>
              <p className="font-body text-base leading-relaxed text-gray-300">
                {t('nosotros.story_p3')}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className="relative lg:col-span-2">
            <div className="relative">
              <div className="img-fade-bottom rounded-3xl overflow-hidden">
                <img decoding="async" loading="lazy"
                  src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80"
                  alt=""
                  className="w-full rounded-3xl object-cover"
                />
              </div>
              <div className="img-fade-bottom rounded-3xl overflow-hidden mt-4 lg:-mt-20 lg:ml-8 lg:w-4/5">
                <img decoding="async" loading="lazy"
                  src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800&q=80"
                  alt=""
                  className="w-full rounded-3xl border-4 border-black object-cover"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index, t }) {
  const isLeft = index % 2 === 0;

  const card = (
    <div className="rounded-2xl border border-gold/20 bg-white/[0.04] backdrop-blur-sm p-6">
      <span className="font-display uppercase text-4xl text-gold" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>{item.year}</span>
      <h3 className="mt-2 font-heading uppercase text-xl font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
        {t(item.titleKey)}
      </h3>
      <p className="mt-2 font-body text-base text-gray-400">
        {t(item.textKey)}
      </p>
    </div>
  );

  return (
    <>
      {/* Desktop: alternating left/right */}
      <div className="relative hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
        <div className={`flex ${isLeft ? 'justify-end pr-8' : 'order-3 col-start-3 pl-8'}`}>
          <AnimatedSection direction={isLeft ? 'left' : 'right'} className="w-full max-w-md">
            {card}
          </AnimatedSection>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="h-4 w-4 rounded-full bg-gold" />
          <div className="w-0.5 flex-1 bg-gold/30" />
        </div>
        <div className={isLeft ? '' : 'order-1 col-start-1 row-start-1'} />
      </div>

      {/* Mobile: always left-aligned */}
      <div className="flex items-start gap-4 md:hidden">
        <div className="mt-2 h-4 w-4 flex-shrink-0 rounded-full bg-gold" />
        <AnimatedSection className="flex-1">
          {card}
        </AnimatedSection>
      </div>
    </>
  );
}

function TimelineSection({ t }) {
  return (
    <section className="section-padding section-tint">
      <div className="container-custom">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block font-body text-xs tracking-[0.4em] uppercase text-gold">
            {t('nosotros.timeline_label')}
          </span>
          <h2 className="font-display uppercase text-3xl sm:text-5xl text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
            {t('nosotros.timeline_title')}
          </h2>
        </AnimatedSection>

        <div className="relative mx-auto max-w-4xl space-y-8">
          {/* Center vertical line (desktop only) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gold/30 md:block" />

          {timelineItems.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection({ t }) {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-custom">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block font-body text-xs tracking-[0.4em] uppercase text-gold">
            {t('nosotros.team_label')}
          </span>
          <h2 className="font-display uppercase text-3xl sm:text-5xl text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
          {t('nosotros.team_title')}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="group overflow-hidden rounded-3xl border border-gold/20 bg-white/[0.05] backdrop-blur-sm">
                <div className="relative aspect-square overflow-hidden rounded-t-3xl">
                  <img decoding="async" loading="lazy"
                    src={member.image}
                    alt={t(member.nameKey)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading uppercase text-xl font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
                    {t(member.nameKey)}
                  </h3>
                  <p className="mt-1 font-body text-sm uppercase tracking-widest text-gold">
                    {t(member.roleKey)}
                  </p>
                  <p className="mt-3 font-body text-sm leading-relaxed text-gray-400">
                    {t(member.bioKey)}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionSection({ t }) {
  return (
    <section className="section-padding section-tint">
      <div className="container-custom">
        <AnimatedSection className="mx-auto max-w-4xl">
          <GoldDivider className="mb-12" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <h2 className="font-display uppercase text-3xl sm:text-5xl leading-tight text-white lg:text-8xl" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
              {t('nosotros.mission_before')}
              <span className="text-gradient-gold">
                {t('nosotros.mission_highlight')}
              </span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl font-body text-lg text-gray-400">
              {t('nosotros.mission_subtext')}
            </p>
          </motion.div>

          <GoldDivider className="mt-12" />
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Page ─── */

export default function Nosotros() {
  const { t } = useTranslation();

  return (
    <main>
      <SEOMeta
        title="Nuestra Historia"
        description="Conocé la historia, el equipo y la filosofía detrás de Total Equines."
      />
      <HeroSection t={t} />
      <BrandStorySection t={t} />
      <TimelineSection t={t} />
      <TeamSection t={t} />
      <MissionSection t={t} />
    </main>
  );
}
