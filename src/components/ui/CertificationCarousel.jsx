import { certifications } from '@/data/certifications';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useTranslation } from '@/hooks/useTranslation';

function ShieldPlaceholder() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
        stroke="#c9a84c"
        strokeWidth="1.5"
        fill="rgba(201,168,76,0.1)"
      />
    </svg>
  );
}

function CertItem({ cert }) {
  return (
    <div className="flex items-center gap-4 mx-12 flex-shrink-0">
      {/* Logo or placeholder shield */}
      <div className="w-12 h-12 rounded-xl bg-white/[0.08] border border-gold/20 flex items-center justify-center flex-shrink-0">
        {cert.logo ? (
          <img
            src={cert.logo}
            alt={cert.abbreviation}
            className="w-10 h-10 object-contain"
            loading="lazy"
          />
        ) : (
          <ShieldPlaceholder />
        )}
      </div>
      {/* Text */}
      <div className="flex flex-col">
        <span
          className="font-display text-gold text-base uppercase tracking-widest"
          style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}
        >
          {cert.abbreviation}
        </span>
        <span
          className="font-body text-white/70 text-xs whitespace-nowrap"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {cert.title}
        </span>
      </div>
      {/* Separator */}
      <div className="w-1 h-1 rounded-full bg-gold/30 ml-12 flex-shrink-0" />
    </div>
  );
}

export default function CertificationCarousel({ speed = 30 }) {
  const { t } = useTranslation();
  const doubled = [...certifications, ...certifications];

  return (
    <section className="section-padding bg-transparent">
      {/* Header */}
      <AnimatedSection className="mb-8 text-center">
        <span className="mb-4 inline-block font-body text-xs tracking-[0.4em] uppercase text-gold">
          {t('inicio.cert_label')}
        </span>
        <h2 className="font-display uppercase text-5xl text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
          {t('inicio.cert_title')}
        </h2>
      </AnimatedSection>

      {/* Carousel strip */}
      <AnimatedSection>
        <div className="h-px w-full bg-gold/20" />
        <div className="carousel-wrapper bg-white/[0.03] py-8">
          <div
            className="animate-marquee"
            style={{ animationDuration: `${speed}s` }}
          >
            {doubled.map((cert, i) => (
              <CertItem key={`${cert.id}-${i}`} cert={cert} />
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-gold/20" />
      </AnimatedSection>
    </section>
  );
}
