import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { IoMailOutline, IoLocationOutline, IoLogoWhatsapp } from 'react-icons/io5';
import { useTranslation } from '@/hooks/useTranslation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import GoldDivider from '@/components/ui/GoldDivider';
import Logo from '@/components/ui/Logo';

function FooterLink({ to, label, indent = false }) {
  return (
    <Link
      to={to}
      className={`group relative inline-block font-body text-sm transition-colors duration-300 ${
        indent ? 'ml-4 text-white/40 hover:text-gold' : 'text-white/60 hover:text-gold'
      }`}
    >
      {label}
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

function ContactItem({ icon: Icon, children }) {
  return (
    <div className="flex items-start gap-3 text-sm text-white/60">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
      <span>{children}</span>
    </div>
  );
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Footer() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <footer ref={ref}>
      <div className="border-t border-gold/20 bg-gradient-to-b from-transparent to-black/60">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="container-custom py-16 lg:py-20"
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            {/* Column 1 — Brand */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <Link to="/" className="inline-block transition-opacity duration-300 hover:opacity-80">
                <Logo size="lg" white={false} className="mb-4 opacity-90" />
              </Link>

              <p className="max-w-xs font-body text-sm leading-relaxed text-white/50">
                {t('footer.tagline')}
              </p>

              <div className="flex items-center gap-3">
                <SocialIcon href="https://www.instagram.com/totalequines?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" icon={FaInstagram} label="Instagram" />
                <SocialIcon href="https://facebook.com" icon={FaFacebookF} label="Facebook" />
                <SocialIcon href="https://wa.me/" icon={FaWhatsapp} label="WhatsApp" />
              </div>
            </motion.div>

            {/* Column 2 — Navigation */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <h4 className="font-display uppercase text-lg tracking-wider text-gold" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
                {t('footer.navigation')}
              </h4>
              <nav className="flex flex-col gap-3">
                <FooterLink to="/" label={t('nav.inicio')} />
                <FooterLink to="/la-cria" label={t('nav.laCria')} />
                <FooterLink to="/la-cria/maternales" label={t('nav.maternales')} indent />
                <FooterLink to="/la-cria/padrillos" label={t('nav.padrillos')} indent />
                <FooterLink to="/ventas" label={t('nav.ventas')} />
                <FooterLink to="/subastas" label={t('nav.subastas')} />
                <FooterLink to="/contacto" label={t('nav.contacto')} />
              </nav>
            </motion.div>

            {/* Column 3 — Contact */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <h4 className="font-display uppercase text-lg tracking-wider text-gold" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
                {t('footer.contact')}
              </h4>
              <div className="flex flex-col gap-4">
                <ContactItem icon={IoMailOutline}>
                  <a
                    href="mailto:contacto@totalequines.com.ar"
                    className="transition-colors duration-300 hover:text-gold"
                  >
                    {t('footer.email')}
                  </a>
                </ContactItem>
                <ContactItem icon={IoLogoWhatsapp}>
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-gold"
                  >
                    {t('footer.phone')}
                  </a>
                </ContactItem>
                <ContactItem icon={IoLocationOutline}>
                  {t('footer.location')}
                </ContactItem>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-gold/10">
          <div className="container-custom flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
            <p className="font-body text-xs text-gray-500">
              &copy; 2025 Total Equines. {t('footer.rights')}
            </p>
            <p className="font-body text-xs text-gray-500">
              {t('footer.developed')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
