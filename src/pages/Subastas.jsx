import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell } from 'react-icons/fi';
import { useTranslation } from '@/hooks/useTranslation';
import { auctions } from '@/data/auctions';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import CountdownTimer from '@/components/ui/CountdownTimer';
import AuctionCard from '@/components/ui/AuctionCard';
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
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img loading="eager" decoding="async" fetchpriority="high"
          src="/assets/horses/total-gonna.webp"
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
        <motion.p variants={fadeUp} className="mb-6 font-body text-xs uppercase tracking-[0.4em] text-gold">
          {t('subastas.hero_label')}
        </motion.p>
        <motion.h1 variants={fadeUp} className="font-display uppercase text-6xl tracking-[0.08em] text-white sm:text-8xl lg:text-9xl" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
          {t('subastas.hero_title')}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-4 font-heading uppercase text-xl font-light text-white/80" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
          {t('subastas.hero_subtitle')}
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
    </section>
  );
}

/* ─── FAQ Accordion ─── */

function FAQSection({ t }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: t('subastas.faq_q1'),
      a: t('subastas.faq_a1'),
    },
    {
      q: t('subastas.faq_q2'),
      a: t('subastas.faq_a2'),
    },
    {
      q: t('subastas.faq_q3'),
      a: t('subastas.faq_a3'),
    },
    {
      q: t('subastas.faq_q4'),
      a: t('subastas.faq_a4'),
    },
    {
      q: t('subastas.faq_q5'),
      a: t('subastas.faq_a5'),
    },
    {
      q: t('subastas.faq_q6'),
      a: t('subastas.faq_a6'),
    },
  ];

  return (
    <section className="section-padding section-tint">
      <div className="container-custom">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-gold">
            {t('subastas.faq_label')}
          </p>
          <h2 className="font-display uppercase text-6xl text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>{t('subastas.faq_title')}</h2>
        </AnimatedSection>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-gray-800">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between py-6 text-left"
                >
                  <span
                    className={`font-heading uppercase text-lg font-semibold transition-colors ${
                      isOpen ? 'text-gold' : 'text-white group-hover:text-gold'
                    }`}
                    style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}
                  >
                    {faq.q}
                  </span>
                  <span className="ml-4 flex-shrink-0 font-display uppercase text-2xl text-gold" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 font-body text-base leading-relaxed text-gray-400">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Newsletter ─── */

function NewsletterSection({ t }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section-padding bg-transparent">
      <GoldDivider className="mb-16" />
      <div className="container-custom">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <FiBell className="mx-auto mb-6 text-gold" size={48} />
          <h2 className="font-display uppercase text-5xl text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>{t('subastas.newsletter_title')}</h2>
          <p className="mt-4 font-body text-base text-gray-400">{t('subastas.newsletter_text')}</p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 font-body text-lg text-gold"
            >
              {t('subastas.newsletter_thanks')}
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('subastas.newsletter_ph')}
                className="flex-1 rounded-2xl border border-gray-700 bg-gray-900 px-5 py-4 font-body text-base text-white placeholder-gray-500 outline-none transition-[border-color] duration-200 focus:border-gold"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-2xl bg-gold px-8 py-4 font-body text-sm uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
              >
                {t('subastas.newsletter_cta')}
              </button>
            </form>
          )}

          <p className="mt-3 font-body text-xs text-gray-600">{t('subastas.newsletter_privacy')}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Page ─── */

export default function Subastas() {
  const { t } = useTranslation();

  const upcoming = auctions.filter((a) => a.status === 'upcoming');
  const closed = auctions.filter((a) => a.status === 'closed');
  const nextAuction = upcoming.sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  return (
    <main>
      <SEOMeta
        title="Subastas"
        description="Participá en nuestras subastas exclusivas de caballos de polo de alto rendimiento."
      />
      <HeroSection t={t} />
      {nextAuction && (
        <CountdownTimer
          targetDate={nextAuction.date}
          auctionName={nextAuction.name}
          dateDisplay={nextAuction.dateDisplay}
          location={nextAuction.location}
        />
      )}

      {/* Upcoming Auctions */}
      <section className="section-padding bg-transparent">
        <div className="container-custom">
          <AnimatedSection className="mb-12">
            <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-gold">
              {t('subastas.upcoming_label')}
            </p>
            <h2 className="font-display uppercase text-6xl text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>{t('subastas.upcoming_title')}</h2>
          </AnimatedSection>

          <div className="space-y-12">
            {upcoming.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} variant="upcoming" />
            ))}
          </div>

          {/* Closed Auctions */}
          {closed.length > 0 && (
            <>
              <AnimatedSection className="mb-12 mt-20">
                <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-gold">
                  {t('subastas.past_label')}
                </p>
                <h2 className="font-display uppercase text-6xl text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>{t('subastas.past_title')}</h2>
              </AnimatedSection>

              <div className="space-y-12">
                {closed.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} variant="closed" />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <FAQSection t={t} />
      <NewsletterSection t={t} />
    </main>
  );
}
