import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/ui/AnimatedSection';

function HorseCard({ horse, delay = 0 }) {
  const { t } = useTranslation();
  const formattedPrice = horse.price
    ? `USD ${horse.price.toLocaleString('es-AR')}`
    : t('ventas.consultar');

  return (
    <AnimatedSection delay={delay}>
      <Link to={`/ventas/${horse.id}`} className="group block">
        <div className="cursor-pointer overflow-hidden rounded-3xl border border-gold/15 bg-white/[0.05] backdrop-blur-sm transition-all duration-350 hover:scale-[1.02] hover:border-gold/50">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              loading="lazy"
              decoding="async"
              src={horse.images[0]}
              alt={horse.name}
              width="600"
              height="450"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
            />
            <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-body text-xs text-white backdrop-blur">
              {horse.sex}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {/* Info */}
          <div className="p-6">
            <h3 className="font-heading uppercase text-xl font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
              {horse.name}
            </h3>
            <div className="my-3 h-0.5 w-8 rounded-full bg-gold" />

            <div className="flex gap-4">
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-gray-500">Edad</p>
                <p className="font-body text-sm text-gray-400">{horse.age} años</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-gray-500">Color</p>
                <p className="font-body text-sm text-gray-400">{horse.color}</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-gray-500">Alzada</p>
                <p className="font-body text-sm text-gray-400">{horse.heightHH} HH</p>
              </div>
            </div>

            <p className={`mt-4 font-heading uppercase text-2xl font-semibold ${horse.price ? 'text-white' : 'text-gold'}`} style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
              {formattedPrice}
            </p>

            <div className="mt-4 w-full rounded-2xl border border-gold/40 py-3 text-center font-body text-xs uppercase tracking-widest text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-black">
              {t('ventas.card_ver_ficha')}
            </div>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}

export default memo(HorseCard, (prev, next) => prev.horse.id === next.horse.id && prev.delay === next.delay);
