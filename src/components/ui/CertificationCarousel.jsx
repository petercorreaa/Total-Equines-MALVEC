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
    <div className="mx-12 flex flex-shrink-0 items-center gap-4">
      {/* Logo or placeholder */}
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-white/[0.08]">
        {cert.logo ? (
          <img
            src={cert.logo}
            alt={cert.title}
            className="h-12 w-12 rounded-xl object-contain"
            loading="lazy"
          />
        ) : (
          <ShieldPlaceholder />
        )}
      </div>
      {/* Text */}
      <div className="flex flex-col">
        <span className="whitespace-nowrap font-heading uppercase text-sm font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
          {cert.title}
        </span>
        <span className="whitespace-nowrap font-body text-xs text-gray-500">
          {cert.issuer} · {cert.year}
        </span>
      </div>
      {/* Separator dot */}
      <div className="ml-12 h-1 w-1 flex-shrink-0 rounded-full bg-gold/30" />
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
        <h2 className="font-display uppercase text-5xl text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
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
