import { memo } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { useTranslation } from '@/hooks/useTranslation';
import { getHorseById } from '@/data/horses';
import AnimatedSection from '@/components/ui/AnimatedSection';

function StatusBadge({ registrationOpen, status, t }) {
  if (status === 'closed') {
    return (
      <span className="rounded-full bg-gray-700 px-4 py-1.5 font-body text-xs tracking-widest text-gray-400">
        {t('subastas.badge_closed')}
      </span>
    );
  }
  if (registrationOpen) {
    return (
      <span className="rounded-full bg-gold px-4 py-1.5 font-body text-xs font-semibold tracking-widest text-black">
        {t('subastas.badge_open')}
      </span>
    );
  }
  return (
    <span className="rounded-full bg-gray-700 px-4 py-1.5 font-body text-xs tracking-widest text-gray-300">
      {t('subastas.badge_soon')}
    </span>
  );
}

function AuctionCard({ auction, variant = 'upcoming' }) {
  const { t } = useTranslation();
  const isClosed = variant === 'closed';

  const horseChips = auction.horseIds
    .map((id) => {
      const horse = getHorseById(id);
      return horse ? { name: horse.name } : null;
    })
    .filter(Boolean);

  return (
    <AnimatedSection>
      <div
        className={`overflow-hidden rounded-3xl border transition-all duration-350 ${
          isClosed
            ? 'border-gray-700 bg-white/[0.03]'
            : 'border-gold/25 bg-white/[0.05] backdrop-blur-sm hover:border-gold/60'
        }`}
      >
        {/* Image */}
        <div className="group relative aspect-[16/7] overflow-hidden">
          <img
            loading="lazy"
            decoding="async"
            src={auction.image}
            alt={auction.name}
            width="1200"
            height="525"
            className={`h-full w-full object-cover transition-transform duration-600 group-hover:scale-[1.04] ${
              isClosed ? 'opacity-60' : ''
            }`}
          />
          {isClosed && <div className="absolute inset-0 bg-black/30" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
          <div className="absolute left-6 top-6">
            <StatusBadge
              registrationOpen={auction.registrationOpen}
              status={auction.status}
              t={t}
            />
          </div>
        </div>

        {/* Info */}
        <div className="p-4 sm:p-8">
          <div className="flex flex-wrap gap-6 font-body text-sm uppercase tracking-widest text-gold">
            <span>{auction.dateDisplay}</span>
            <span className="text-gold">·</span>
            <span>{auction.format}</span>
          </div>

          <h3 className="mt-2 font-display uppercase text-2xl sm:text-4xl text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>{auction.name}</h3>
          <p className="mt-1 font-heading uppercase text-lg font-light text-gray-400" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
            {auction.subtitle}
          </p>

          <div className="mt-3 flex items-center gap-2 font-body text-sm text-gray-400">
            <FiMapPin className="text-gold" size={16} />
            {auction.location}
          </div>

          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-gray-300">
            {auction.description}
          </p>

          {/* Left-aligned gold divider */}
          <div className="mt-6 h-px w-[60px] bg-gold" />

          {/* Horse chips */}
          <div className="mt-6">
            <p className="font-body text-xs uppercase tracking-widest text-gray-500">
              {t('subastas.horses_in_auction')}
            </p>
            <div className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto pb-2">
              {horseChips.map((chip) => (
                <span
                  key={chip.name}
                  className="flex-shrink-0 rounded-xl border border-gray-700 bg-white/[0.05] px-4 py-2 font-body text-xs text-white transition-colors hover:border-gold/40"
                >
                  {chip.name}
                </span>
              ))}
            </div>
          </div>

          {/* CTA or Results */}
          {isClosed && auction.results ? (
            <div className="mt-6 rounded-2xl border border-gray-700 bg-white/[0.04] p-6">
              <p className="font-body text-xs uppercase tracking-widest text-gold">
                {t('subastas.results_title')}
              </p>
              <div className="mt-4">
                <p className="font-display uppercase text-2xl sm:text-3xl text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
                  {auction.results.totalSold}
                </p>
                <p className="font-body text-xs text-gray-500">
                  {t('subastas.results_sold')}
                </p>
              </div>
              <p className="mt-4 font-body text-sm text-gray-400">
                {t('subastas.results_countries')}: {auction.results.countries.join(', ')}
              </p>
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {auction.registrationOpen ? (
                <>
                  <a
                    href={auction.registrationLink}
                    className="rounded-2xl bg-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-black transition-colors hover:bg-gold-light"
                  >
                    {t('subastas.cta_register')}
                  </a>
                  <button className="rounded-2xl border border-gold/40 px-8 py-3 font-body text-sm uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-black">
                    {t('subastas.cta_details')}
                  </button>
                </>
              ) : (
                <>
                  <button className="rounded-2xl border border-gray-600 px-8 py-3 font-body text-sm uppercase tracking-widest text-gray-300 transition-colors hover:border-gold/40 hover:text-gold">
                    {t('subastas.cta_notify')}
                  </button>
                  <span className="font-body text-sm text-gray-500">
                    {t('subastas.cta_soon_text')}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default memo(AuctionCard);
