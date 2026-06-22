import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';

const SCROLL_THRESHOLD = 80;

function NavLink({ to, label, isActive }) {
  return (
    <Link to={to} className="group relative py-2">
      <span
        className={`font-body text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${
          isActive ? 'text-gold' : 'text-white/80 group-hover:text-gold'
        }`}
      >
        {label}
      </span>
      <span
        className={`absolute bottom-0 left-0 h-px bg-gold transition-transform duration-300 origin-left ${
          isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </Link>
  );
}

import LogoImg from '@/components/ui/Logo';

function CriaDropdown({ t, pathname }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const isActive = pathname.startsWith('/la-cria');

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button className="group relative flex items-center gap-1 py-2">
        <span
          className={`font-body text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${
            isActive ? 'text-gold' : 'text-white/80 group-hover:text-gold'
          }`}
        >
          {t('nav.laCria')}
        </span>
        <IoChevronDown
          className={`h-3 w-3 transition-all duration-300 ${
            isActive ? 'text-gold' : 'text-white/80 group-hover:text-gold'
          } ${open ? 'rotate-180' : ''}`}
        />
        <span
          className={`absolute bottom-0 left-0 h-px bg-gold transition-transform duration-300 origin-left ${
            isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-1/2 top-full mt-2 -translate-x-1/2 min-w-[220px] rounded-2xl border border-gold/20 bg-black/95 p-2 shadow-2xl backdrop-blur-md"
          >
            <DropdownItem to="/la-cria" label={t('nav.laCria')} pathname={pathname} />
            <DropdownItem to="/la-cria/maternales" label={t('nav.maternales')} pathname={pathname} />
            <DropdownItem to="/la-cria/padrillos" label={t('nav.padrillos')} pathname={pathname} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({ to, label, pathname }) {
  const isActive = pathname === to;
  return (
    <Link
      to={to}
      className={`group flex items-center justify-between rounded-xl px-4 py-3 transition-colors duration-200 ${
        isActive ? 'bg-gold/10 text-gold' : 'text-white/70 hover:bg-gold/5 hover:text-gold'
      }`}
    >
      <span className="font-body text-sm tracking-wide">{label}</span>
      <IoChevronForward className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 text-gold" />
    </Link>
  );
}

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const langs = ['ES', 'EN', 'ZH'];

  return (
    <div className="relative flex items-center gap-1 font-body text-xs tracking-widest">
      {langs.map((lang, i) => (
        <span key={lang} className="flex items-center gap-1">
          <button
            onClick={() => setLanguage(lang.toLowerCase())}
            className={`px-1 py-0.5 transition-colors duration-300 ${
              language === lang.toLowerCase()
                ? 'text-gold'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {lang}
          </button>
          {i < langs.length - 1 && (
            <span className="text-white/20">|</span>
          )}
        </span>
      ))}
    </div>
  );
}

function MobileMenu({ isOpen, onClose, t, pathname }) {
  const links = [
    { to: '/', label: t('nav.inicio') },
    { to: '/la-cria', label: t('nav.laCria') },
    { to: '/la-cria/maternales', label: t('nav.maternales'), indent: true },
    { to: '/la-cria/padrillos', label: t('nav.padrillos'), indent: true },
    { to: '/ventas', label: t('nav.ventas') },
    { to: '/subastas', label: t('nav.subastas') },
    { to: '/contacto', label: t('nav.contacto') },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black"
        >
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center gap-6"
          >
            {links.map((link) => (
              <motion.div key={link.to} variants={itemVariants}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  className={`font-body text-lg uppercase tracking-[0.25em] transition-colors duration-300 ${
                    link.indent ? 'text-base text-white/50 hover:text-gold' : ''
                  } ${
                    pathname === link.to
                      ? 'text-gold'
                      : link.indent
                        ? ''
                        : 'text-white/80 hover:text-gold'
                  }`}
                >
                  {link.indent && '— '}
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-gold/20">
              <LanguageSelector />
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hamburger({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
      aria-label="Toggle menu"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block h-px w-6 bg-white"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-px w-6 bg-white"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block h-px w-6 bg-white"
      />
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    let ticking = false;
    const scrolledRef = { current: false };
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const nowScrolled = window.scrollY > SCROLL_THRESHOLD;
          if (nowScrolled !== scrolledRef.current) {
            scrolledRef.current = nowScrolled;
            setScrolled(nowScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.2)' : 'rgba(10, 10, 10, 0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          borderBottomColor: scrolled ? 'rgba(201, 168, 76, 0.2)' : 'rgba(201, 168, 76, 0)',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
      >
        <div className="container-custom">
          <nav className="relative flex h-20 items-center justify-between lg:h-24">
            {/* Left links — desktop */}
            <div className="hidden lg:flex items-center gap-8">
              <NavLink to="/" label={t('nav.inicio')} isActive={pathname === '/'} />
              <CriaDropdown t={t} pathname={pathname} />
              <NavLink to="/ventas" label={t('nav.ventas')} isActive={pathname === '/ventas' || pathname.startsWith('/ventas/')} />
            </div>

            {/* Centered logo — desktop */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link to="/" className="flex items-center">
                <LogoImg size="md" white={false} className="transition-opacity duration-300 hover:opacity-80" />
              </Link>
            </div>

            {/* Mobile logo — left aligned on mobile */}
            <div className="lg:hidden z-50">
              <Link to="/" className="flex items-center">
                <LogoImg size="sm" white={false} className="transition-opacity duration-300 hover:opacity-80" />
              </Link>
            </div>

            {/* Right links — desktop */}
            <div className="hidden lg:flex items-center gap-8">
              <NavLink to="/subastas" label={t('nav.subastas')} isActive={pathname === '/subastas'} />
              <NavLink to="/contacto" label={t('nav.contacto')} isActive={pathname === '/contacto'} />
              <div className="ml-4 pl-4 border-l border-white/10">
                <LanguageSelector />
              </div>
            </div>

            {/* Hamburger — mobile */}
            <Hamburger isOpen={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
          </nav>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        t={t}
        pathname={pathname}
      />
    </>
  );
}
