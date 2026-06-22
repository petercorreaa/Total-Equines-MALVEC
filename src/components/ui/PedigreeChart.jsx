import { useTranslation } from '@/hooks/useTranslation';

const coutureStyle = {
  fontFamily: 'Couture, sans-serif',
  fontWeight: 700,
  textTransform: 'uppercase',
  WebkitTextStroke: '0.015em currentColor',
  fontSynthesis: 'none',
};

function PedigreeNode({ label, name, variant = 'default', compact = false }) {
  const { t } = useTranslation();
  const styles = {
    horse: 'border-gold/50 bg-gold/10',
    parent: 'border-gold/25 bg-white/[0.05]',
    default: 'border-gray-600/30 bg-white/[0.04]',
  };

  const hasValue = Boolean(name && String(name).trim());

  return (
    <div
      className={`rounded-xl border ${compact ? 'p-2.5' : 'p-3 sm:p-4'} ${styles[variant]} ${
        hasValue ? '' : 'opacity-30'
      }`}
    >
      {label && (
        <p className="font-body text-xs uppercase tracking-widest text-gray-500">
          {label}
        </p>
      )}
      {hasValue ? (
        <p
          className={`${label ? 'mt-1' : ''} font-heading uppercase ${
            compact ? 'text-xs' : 'text-sm'
          } font-semibold text-white`}
          style={coutureStyle}
        >
          {name}
        </p>
      ) : (
        <span
          className={`${label ? 'mt-1 block' : ''} font-body text-xs italic text-gray-600`}
        >
          {t('attr.not_available')}
        </span>
      )}
    </div>
  );
}

export default function PedigreeChart({ pedigree, horseName, gen5plus }) {
  const { t } = useTranslation();

  if (!pedigree) return null;

  // 8 great-grandparents (4th generation), ordered to align with the 4 grandparents above
  const greatGrandparents = [
    pedigree.sireSireSire,
    pedigree.sireSireDam,
    pedigree.sireDamSire,
    pedigree.sireDamDam,
    pedigree.damSireSire,
    pedigree.damSireDam,
    pedigree.damDamSire,
    pedigree.damDamDam,
  ];

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[960px] grid-cols-[1fr_1fr_1fr_1fr] gap-4">
        {/* Column 1 — Horse */}
        <div className="flex items-center">
          <PedigreeNode label={horseName} name={horseName} variant="horse" />
        </div>

        {/* Column 2 — Sire & Dam */}
        <div className="flex flex-col justify-center gap-4">
          <div className="relative">
            <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/30" />
            <PedigreeNode
              label={t('ventas.detail_pedigree_sire')}
              name={pedigree.sire}
              variant="parent"
            />
          </div>
          <div className="relative">
            <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/30" />
            <PedigreeNode
              label={t('ventas.detail_pedigree_dam')}
              name={pedigree.dam}
              variant="parent"
            />
          </div>
        </div>

        {/* Column 3 — Grandparents */}
        <div className="flex flex-col justify-center gap-3">
          <div className="relative">
            <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/20" />
            <PedigreeNode
              label={t('ventas.detail_pedigree_sire_sire')}
              name={pedigree.sireSire}
            />
          </div>
          <div className="relative">
            <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/20" />
            <PedigreeNode
              label={t('ventas.detail_pedigree_sire_dam')}
              name={pedigree.sireDam}
            />
          </div>
          <div className="relative">
            <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/20" />
            <PedigreeNode
              label={t('ventas.detail_pedigree_dam_sire')}
              name={pedigree.damSire}
            />
          </div>
          <div className="relative">
            <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/20" />
            <PedigreeNode
              label={t('ventas.detail_pedigree_dam_dam')}
              name={pedigree.damDam}
            />
          </div>
        </div>

        {/* Column 4 — Great-grandparents */}
        <div className="flex flex-col justify-center gap-2">
          {greatGrandparents.map((name, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/15" />
              <PedigreeNode name={name} compact />
            </div>
          ))}
        </div>
      </div>

      {gen5plus && (
        <div className="mt-6 border-t border-gold/15 pt-6">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold">
            Antepasados Adicionales
          </span>
          <p className="mt-2 font-body text-sm leading-relaxed text-gray-400">
            {gen5plus}
          </p>
        </div>
      )}
    </div>
  );
}
