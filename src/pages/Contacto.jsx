import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiMapPin, FiInstagram, FiFacebook, FiYoutube, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GoldDivider from '@/components/ui/GoldDivider';
import SEOMeta from '@/components/layout/SEOMeta';

/* ─── Hero ─── */

function HeroSection({ t }) {
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden">
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
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.p variants={fadeUp} className="mb-6 font-body text-xs uppercase tracking-[0.4em] text-gold">
          {t('contacto.hero_label')}
        </motion.p>
        <motion.h1 variants={fadeUp} className="font-display uppercase text-6xl tracking-[0.08em] text-white sm:text-8xl lg:text-9xl" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
          {t('contacto.hero_title')}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-4 font-heading uppercase text-xl font-light text-white/80" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
          {t('contacto.hero_subtitle')}
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ─── Form ─── */

// TODO: Replace XXXXXXXX with your Formspree form ID. Sign up free at formspree.io
const FORMSPREE_URL = 'https://formspree.io/f/XXXXXXXX';

const countryCodes = [
  { flag: '🇦🇷', code: '+54' },
  { flag: '🇺🇸', code: '+1' },
  { flag: '🇬🇧', code: '+44' },
  { flag: '🇳🇿', code: '+64' },
  { flag: '🇦🇺', code: '+61' },
  { flag: '🇧🇷', code: '+55' },
  { flag: '🇨🇳', code: '+86' },
];

const fieldClass =
  'w-full rounded-2xl border border-gray-700 bg-gray-900 px-5 py-4 font-body text-base text-white placeholder-gray-500 outline-none transition-[border-color] duration-200 focus:border-gold focus:ring-1 focus:ring-gold/30';

function ContactForm({ t }) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    countryCode: '+54',
    phone: '',
    subject: '',
    horse: searchParams.get('horse') || '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    const h = searchParams.get('horse');
    if (h) setForm((prev) => ({ ...prev, horse: h }));
  }, [searchParams]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: `${form.countryCode} ${form.phone}`,
          subject: form.subject,
          horse: form.horse,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center py-16 text-center"
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-6">
          <circle cx="32" cy="32" r="30" stroke="#c9a84c" strokeWidth="2" />
          <path d="M20 32l8 8 16-16" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 className="font-display uppercase text-5xl text-gold" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>{t('contacto.success_title')}</h2>
        <p className="mt-4 font-body text-lg text-gray-300">{t('contacto.success_text')}</p>
        <Link
          to="/"
          className="mt-8 rounded-2xl bg-gold px-8 py-4 font-body text-sm uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
        >
          {t('contacto.success_back')}
        </Link>
      </motion.div>
    );
  }

  const disabled = status === 'loading';

  return (
    <div>
      <p className="mb-2 font-body text-xs uppercase tracking-[0.4em] text-gold">
        {t('contacto.form_label')}
      </p>
      <h2 className="font-display uppercase text-5xl text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>{t('contacto.form_title')}</h2>
      <div className="mt-4 h-px w-[60px] bg-gold" />

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 rounded-2xl border border-[#ef4444]/30 bg-[#7f1d1d]/30 p-4"
          >
            <p className="font-body text-sm text-[#fca5a5]">{t('contacto.error_text')}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Nombre */}
        <div>
          <label className="mb-2 block font-body text-xs uppercase tracking-widest text-gray-400">
            {t('contacto.field_name')}
          </label>
          <input
            type="text"
            name="name"
            required
            disabled={disabled}
            value={form.name}
            onChange={handleChange}
            placeholder={t('contacto.field_name_ph')}
            className={fieldClass}
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block font-body text-xs uppercase tracking-widest text-gray-400">
            {t('contacto.field_email')}
          </label>
          <input
            type="email"
            name="email"
            required
            disabled={disabled}
            value={form.email}
            onChange={handleChange}
            placeholder={t('contacto.field_email_ph')}
            className={fieldClass}
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="mb-2 block font-body text-xs uppercase tracking-widest text-gray-400">
            {t('contacto.field_phone')}
          </label>
          <div className="flex gap-3">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              disabled={disabled}
              className={`${fieldClass} w-32 flex-shrink-0`}
            >
              {countryCodes.map((cc) => (
                <option key={cc.code} value={cc.code}>
                  {cc.flag} {cc.code}
                </option>
              ))}
              <option value="">{t('contacto.field_phone_other')}</option>
            </select>
            <input
              type="tel"
              name="phone"
              disabled={disabled}
              value={form.phone}
              onChange={handleChange}
              placeholder={t('contacto.field_phone_ph')}
              className={`${fieldClass} flex-1`}
            />
          </div>
        </div>

        {/* Asunto */}
        <div>
          <label className="mb-2 block font-body text-xs uppercase tracking-widest text-gray-400">
            {t('contacto.field_subject')}
          </label>
          <select
            name="subject"
            required
            disabled={disabled}
            value={form.subject}
            onChange={handleChange}
            className={fieldClass}
          >
            <option value="" disabled>
              {t('contacto.field_subject_default')}
            </option>
            <option value="horse">{t('contacto.field_subject_horse')}</option>
            <option value="breeding">{t('contacto.field_subject_breeding')}</option>
            <option value="auctions">{t('contacto.field_subject_auctions')}</option>
            <option value="export">{t('contacto.field_subject_export')}</option>
            <option value="visit">{t('contacto.field_subject_visit')}</option>
            <option value="other">{t('contacto.field_subject_other')}</option>
          </select>
        </div>

        {/* Caballo de Interés */}
        <div>
          <label className="mb-2 block font-body text-xs uppercase tracking-widest text-gray-400">
            {t('contacto.field_horse')}
          </label>
          <input
            type="text"
            name="horse"
            disabled={disabled}
            value={form.horse}
            onChange={handleChange}
            placeholder={t('contacto.field_horse_ph')}
            className={fieldClass}
          />
          <p className="mt-1 font-body text-xs text-gray-500">{t('contacto.field_horse_helper')}</p>
        </div>

        {/* Mensaje */}
        <div>
          <label className="mb-2 block font-body text-xs uppercase tracking-widest text-gray-400">
            {t('contacto.field_message')}
          </label>
          <textarea
            name="message"
            required
            disabled={disabled}
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder={t('contacto.field_message_ph')}
            className={`${fieldClass} resize-none`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={disabled}
          className="flex w-full items-center justify-center rounded-2xl bg-gold py-4 font-body text-sm font-semibold uppercase tracking-[0.3em] text-black transition-colors duration-300 hover:bg-gold-light disabled:opacity-60"
        >
          {disabled ? (
            <>
              <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              {t('contacto.submit_loading')}
            </>
          ) : (
            t('contacto.submit_text')
          )}
        </button>
      </form>
    </div>
  );
}

/* ─── Contact Info ─── */

function ContactInfo({ t }) {
  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      {/* Block 1 — Direct Contact */}
      <AnimatedSection direction="right">
        <h3 className="font-display uppercase text-4xl text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>{t('contacto.info_title')}</h3>
        <div className="mt-4 h-px w-[60px] bg-gold" />

        <div className="mt-6">
          {/* Email */}
          <a
            href="mailto:contacto@totalequines.com.ar"
            className="group flex items-start gap-4 border-b border-gray-800 py-5 transition-colors"
          >
            <FiMail className="mt-1 flex-shrink-0 text-gold" size={24} />
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-gray-500">
                {t('contacto.info_email_label')}
              </p>
              <p className="font-heading uppercase text-base text-white transition-colors group-hover:text-gold" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
                contacto@totalequines.com.ar
              </p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/549XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 border-b border-gray-800 py-5 transition-colors"
          >
            <FaWhatsapp className="mt-1 flex-shrink-0 text-[#4ade80]" size={24} />
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-gray-500">
                {t('contacto.info_wa_label')}
              </p>
              <p className="font-heading uppercase text-base text-white transition-colors group-hover:text-[#4ade80]" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
                +54 9 11 XXXX-XXXX
              </p>
              <p className="font-body text-xs text-[#4ade80]">{t('contacto.info_wa_sub')}</p>
            </div>
          </a>

          {/* Location */}
          <div className="flex items-start gap-4 border-b border-gray-800 py-5">
            <FiMapPin className="mt-1 flex-shrink-0 text-gold" size={24} />
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-gray-500">
                {t('contacto.info_location_label')}
              </p>
              <p className="font-heading uppercase text-base text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>{t('contacto.info_location_value')}</p>
              <p className="font-body text-xs text-gray-500">{t('contacto.info_location_sub')}</p>
            </div>
          </div>
        </div>

        {/* Block 2 — Social */}
        <h4 className="mt-10 font-display uppercase text-3xl text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>{t('contacto.social_title')}</h4>
        <div className="mt-4 flex gap-3">
          {[
            { Icon: FiInstagram, href: 'https://www.instagram.com/totalequines?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram' },
            { Icon: FiFacebook, href: '#', label: 'Facebook' },
            { Icon: FiYoutube, href: '#', label: 'YouTube' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gray-700 p-3 text-gray-400 transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Block 3 — Response Time */}
        <div className="mt-8 rounded-2xl border border-gold/20 bg-white/[0.04] backdrop-blur-sm p-6">
          <FiClock className="mb-3 text-gold" size={24} />
          <h4 className="font-heading uppercase text-lg font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>{t('contacto.response_title')}</h4>
          <p className="mt-2 font-body text-sm leading-relaxed text-gray-400">
            {t('contacto.response_text')}
          </p>
          <p className="mt-4 font-body text-xs tracking-widest text-gold">
            {t('contacto.response_hours')}
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}

/* ─── Map Section ─── */

function MapSection({ t }) {
  return (
    <section className="section-tint py-20">
      <div className="container-custom">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-gold">
            {t('contacto.map_label')}
          </p>
          <h2 className="font-display uppercase text-6xl text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>{t('contacto.map_title')}</h2>
        </AnimatedSection>

        <AnimatedSection className="mx-auto max-w-5xl">
          <div className="relative h-[280px] sm:h-[400px] overflow-hidden rounded-3xl border border-gold/20 bg-white/[0.04]">
            {/* Grid lines */}
            <div
              className="absolute inset-0 bg-[length:60px_60px]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(201,168,76,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.07) 1px, transparent 1px)',
              }}
            />
            <div className="absolute inset-0 bg-[#1a1a1a]/90" />

            {/* Pin + text */}
            <div className="relative flex h-full flex-col items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 4C16.27 4 10 10.27 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14z"
                  fill="#c9a84c"
                />
                <circle cx="24" cy="18" r="6" fill="#0a0a0a" />
              </svg>
              <p className="mt-4 font-heading uppercase text-lg text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>Total Equines</p>
              <p className="mt-1 font-body text-sm text-gray-400">{t('contacto.info_location_value')}</p>
            </div>
          </div>

          <p className="mt-4 text-center font-body text-sm text-gray-500">
            📍 {t('contacto.map_note')}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Page ─── */

export default function Contacto() {
  const { t } = useTranslation();

  return (
    <main>
      <SEOMeta
        title="Contacto"
        description="Contactanos para consultas sobre venta, cría y subastas de caballos de polo."
      />
      <HeroSection t={t} />

      <section className="section-padding bg-transparent">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[55fr_45fr]">
            <AnimatedSection>
              <ContactForm t={t} />
            </AnimatedSection>
            <ContactInfo t={t} />
          </div>
        </div>
      </section>

      <MapSection t={t} />
    </main>
  );
}
