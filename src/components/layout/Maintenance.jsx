import { useEffect } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import Logo from '@/components/ui/Logo';
import GoldDivider from '@/components/ui/GoldDivider';

/**
 * Full-site gate shown while the client isn't ready to launch.
 * Mounted directly by App — bypasses the router, navbar and footer so no
 * other page content is ever reachable while this is active.
 */
export default function Maintenance() {
  useEffect(() => {
    document.title = 'Total Equines — En Mantenimiento';

    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow');
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
      <div className="noise-overlay absolute inset-0" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(201,168,76,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex max-w-lg flex-col items-center">
        <Logo size="lg" white className="mb-10 opacity-90" />

        <span className="mb-6 font-body text-xs tracking-[0.4em] text-gold uppercase">
          Total Equines
        </span>

        <h1
          className="maintenance-title whitespace-nowrap font-display uppercase text-xl tracking-[0.04em] sm:text-4xl"
          style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}
        >
          <span className="text-gradient-gold">En Mantenimiento</span>
        </h1>

        <GoldDivider className="my-8 w-full max-w-[220px]" />

        <p className="font-body text-base leading-relaxed text-gray-400 sm:text-lg">
          Estamos preparando algo especial. Nuestro sitio estará disponible muy pronto.
        </p>

        <div className="mt-10 flex items-center gap-5">
          <a
            href="https://www.instagram.com/totalequines?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/50 transition-colors duration-300 hover:text-gold"
          >
            <FaInstagram className="h-5 w-5" />
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-white/50 transition-colors duration-300 hover:text-gold"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>
          <a
            href="mailto:contacto@totalequines.com.ar"
            aria-label="Email"
            className="text-white/50 transition-colors duration-300 hover:text-gold"
          >
            <FiMail className="h-5 w-5" />
          </a>
        </div>
      </div>

      <span className="absolute bottom-8 z-10 font-body text-[11px] tracking-widest text-white/25">
        © {new Date().getFullYear()} Total Equines
      </span>
    </div>
  );
}
