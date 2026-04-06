import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { horses, getHorseById } from '@/data/horses';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import ImageCarousel from '@/components/ui/ImageCarousel';
import PedigreeChart from '@/components/ui/PedigreeChart';
import HorseCard from '@/components/ui/HorseCard';
import SEOMeta from '@/components/layout/SEOMeta';

/* ─── Helpers ─── */

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <path d="M4 9l3.5 3.5L14 6" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Hero ─── */

function HeroSection({ horse, t }) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <ImageCarousel images={horse.images} horseName={horse.name} />

      {/* Layer 1 — Base dark veil */}
      <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none" />
      {/* Layer 2 — Bottom-up gradient (stronger for bottom-anchored content) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
      {/* Layer 3 — Top-down fade */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
      {/* Layer 4 — Radial vignette behind text */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(0,0,0,0.55) 0%, transparent 70%)'
        }}
      />
      <div className="noise-overlay absolute inset-0 z-10" />

      {/* Content — bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-0 left-0 z-20 w-full p-8 sm:p-12 lg:p-16"
      >
        <p className="font-body text-xs tracking-widest text-white/50">
          <Link to="/ventas" className="transition-colors hover:text-gold">
            {t('ventas.detail_breadcrumb_ventas')}
          </Link>
          {' / '}{horse.name}
        </p>

        <h1 className="mt-3 font-display uppercase text-5xl tracking-[0.05em] text-white sm:text-7xl lg:text-9xl" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
          {horse.name}
        </h1>

        {/* Stat pills */}
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            `${horse.age} años`,
            horse.sex,
            horse.color,
            `${horse.heightHH} HH`,
            `HCP ${horse.poloHandicap}`,
          ].map((stat) => (
            <span
              key={stat}
              className="rounded-full border border-white/20 bg-black/50 px-5 py-2 font-body text-sm text-white backdrop-blur"
            >
              {stat}
            </span>
          ))}
        </div>

      </motion.div>
    </section>
  );
}

/* ─── Details ─── */

function DetailsSection({ horse, t }) {
  const detailItems = [
    { label: t('ventas.detail_origin'), value: horse.origin },
    { label: t('ventas.detail_breeder'), value: horse.breeder },
    { label: t('ventas.detail_trainer'), value: horse.trainedBy },
    { label: t('ventas.detail_sex'), value: horse.sex },
    { label: t('ventas.detail_color'), value: horse.color },
    { label: t('ventas.detail_height'), value: `${horse.heightHH} HH` },
  ];

  const waText = encodeURIComponent(`${t('ventas.detail_wa_message')} ${horse.name}`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <section className="section-padding bg-transparent">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          {/* Left column */}
          <div>
            {/* Description */}
            <AnimatedSection>
              <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-gold">
                {t('ventas.detail_description')}
              </p>
              <p className="font-body text-lg leading-relaxed text-gray-300">
                {horse.description}
              </p>
              <GoldDivider className="mt-10" />
            </AnimatedSection>

            {/* Info grid */}
            <AnimatedSection className="mt-10">
              <p className="mb-6 font-body text-xs uppercase tracking-[0.4em] text-gold">
                {t('ventas.detail_info')}
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {detailItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-gold/15 bg-white/[0.04] p-4"
                  >
                    <p className="font-body text-xs uppercase tracking-widest text-gray-500">
                      {item.label}
                    </p>
                    <p className="mt-1 font-heading uppercase text-base font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <GoldDivider className="mt-10" />
            </AnimatedSection>

            {/* Achievements */}
            <AnimatedSection className="mt-10">
              <p className="mb-6 font-body text-xs uppercase tracking-[0.4em] text-gold">
                {t('ventas.detail_achievements')}
              </p>
              <div>
                {horse.achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 py-3 ${
                      i < horse.achievements.length - 1 ? 'border-b border-gray-800' : ''
                    }`}
                  >
                    <CheckIcon />
                    <p className="font-body text-base text-gray-300">{achievement}</p>
                  </div>
                ))}
              </div>
              <GoldDivider className="mt-10" />
            </AnimatedSection>

            {/* Pedigree */}
            <AnimatedSection className="mt-10">
              <p className="mb-6 font-body text-xs uppercase tracking-[0.4em] text-gold">
                {t('ventas.detail_pedigree')}
              </p>
              <PedigreeChart pedigree={horse.pedigree} horseName={horse.name} />
            </AnimatedSection>
          </div>

          {/* Right column — sticky CTA */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AnimatedSection direction="right">
              <div className="rounded-3xl border border-gold/30 bg-white/[0.05] backdrop-blur-sm p-8">
                <h3 className="font-heading uppercase text-xl font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
                  {horse.name}
                </h3>

                <div className="my-6 h-px bg-gray-700" />

                <p className="font-body text-sm text-gray-400">
                  {t('ventas.detail_interested')}
                </p>

                <Link
                  to={`/contacto?horse=${horse.id}`}
                  className="mt-4 block w-full rounded-2xl bg-gold py-4 text-center font-body text-sm uppercase tracking-widest text-black transition-colors duration-300 hover:bg-gold-light"
                >
                  {t('ventas.detail_cta_primary')}
                </Link>

                <a
                  href={`https://wa.me/549XXXXXXXXXX?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block w-full rounded-2xl border py-4 text-center font-body text-sm uppercase tracking-widest transition-colors duration-300"
                  style={{ borderColor: 'rgba(34,197,94,0.5)', color: 'rgb(74,222,128)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {t('ventas.detail_cta_whatsapp')}
                </a>

                {/* Share */}
                <div className="mt-6">
                  <p className="font-body text-xs uppercase tracking-widest text-gray-500">
                    {t('ventas.detail_share')}
                  </p>
                  <div className="mt-2 flex gap-3">
                    <button
                      onClick={handleCopyLink}
                      className="rounded-xl border border-gray-600 px-4 py-2 font-body text-xs text-gray-400 transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      {t('ventas.detail_copy_link')}
                    </button>
                    <a
                      href={`https://wa.me/?text=${waText}%20${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-gray-600 px-4 py-2 font-body text-xs text-gray-400 transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Related ─── */

function RelatedSection({ horse, t }) {
  const related = useMemo(() => {
    return horses
      .filter((h) => h.id !== horse.id && h.sex === horse.sex)
      .slice(0, 3);
  }, [horse]);

  if (related.length === 0) return null;

  return (
    <section className="section-padding section-tint">
      <div className="container-custom">
        <AnimatedSection className="mb-12">
          <h2 className="font-display uppercase text-4xl text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
            {t('ventas.detail_related')}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((h, i) => (
            <HorseCard key={h.id} horse={h} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 404 ─── */

function NotFound({ t }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-transparent">
      <div className="text-center">
        <h1 className="font-display uppercase text-6xl text-gold" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>404</h1>
        <p className="mt-4 font-heading uppercase text-2xl font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
          {t('ventas.detail_not_found')}
        </p>
        <p className="mt-2 font-body text-gray-400">
          {t('ventas.detail_not_found_text')}
        </p>
        <Link
          to="/ventas"
          className="mt-8 inline-block rounded-full border border-gold/40 px-8 py-3 font-body text-xs uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-black"
        >
          {t('ventas.detail_back')}
        </Link>
      </div>
    </main>
  );
}

/* ─── Page ─── */

export default function HorseDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const horse = getHorseById(id);

  if (!horse) return <NotFound t={t} />;

  return (
    <main>
      <SEOMeta
        title={horse.name}
        description={horse.description.split('.')[0] + '.'}
        image={horse.images[0]}
      />
      <HeroSection horse={horse} t={t} />
      <DetailsSection horse={horse} t={t} />
      <RelatedSection horse={horse} t={t} />

      {/* Back nav */}
      <section className="bg-transparent py-12">
        <div className="text-center">
          <Link
            to="/ventas"
            className="inline-block rounded-full border border-gold/40 px-8 py-3 font-body text-xs uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-black"
          >
            ← {t('ventas.detail_back')}
          </Link>
        </div>
      </section>
    </main>
  );
}
