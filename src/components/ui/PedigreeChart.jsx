import { useTranslation } from '@/hooks/useTranslation';

function PedigreeNode({ label, name, origin, variant = 'default' }) {
  const styles = {
    horse: 'border-gold/50 bg-gold/10',
    parent: 'border-gold/25 bg-white/[0.05]',
    default: 'border-gray-600/30 bg-white/[0.04]',
  };

  return (
    <div className={`rounded-xl border p-3 sm:p-4 ${styles[variant]}`}>
      <p className="font-body text-xs uppercase tracking-widest text-gray-500">
        {label}
      </p>
      <p className="mt-1 font-heading uppercase text-sm font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', fontWeight: 700, textTransform: 'uppercase', WebkitTextStroke: '0.015em currentColor', fontSynthesis: 'none' }}>
        {name}
      </p>
      {origin && (
        <span className="mt-1 inline-block rounded-full bg-gray-700 px-2 py-0.5 font-body text-xs text-gray-300">
          {origin}
        </span>
      )}
    </div>
  );
}

export default function PedigreeChart({ pedigree, horseName }) {
  const { t } = useTranslation();

  if (!pedigree) return null;

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[700px] grid-cols-[1fr_1fr_1fr] gap-4">
        {/* Column 1 — Horse */}
        <div className="flex items-center">
          <PedigreeNode
            label={horseName}
            name={horseName}
            variant="horse"
          />
        </div>

        {/* Column 2 — Sire & Dam */}
        <div className="flex flex-col justify-center gap-4">
          <div className="relative">
            <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/30" />
            <PedigreeNode
              label={t('ventas.detail_pedigree_sire')}
              name={pedigree.sire.name}
              origin={pedigree.sire.origin}
              variant="parent"
            />
          </div>
          <div className="relative">
            <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/30" />
            <PedigreeNode
              label={t('ventas.detail_pedigree_dam')}
              name={pedigree.dam.name}
              origin={pedigree.dam.origin}
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
              name={pedigree.sireSire.name}
              origin={pedigree.sireSire.origin}
            />
          </div>
          <div className="relative">
            <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/20" />
            <PedigreeNode
              label={t('ventas.detail_pedigree_sire_dam')}
              name={pedigree.sireDam.name}
              origin={pedigree.sireDam.origin}
            />
          </div>
          <div className="relative">
            <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/20" />
            <PedigreeNode
              label={t('ventas.detail_pedigree_dam_sire')}
              name={pedigree.damSire.name}
              origin={pedigree.damSire.origin}
            />
          </div>
          <div className="relative">
            <div className="absolute -left-4 top-1/2 h-px w-4 bg-gold/20" />
            <PedigreeNode
              label={t('ventas.detail_pedigree_dam_dam')}
              name={pedigree.damDam.name}
              origin={pedigree.damDam.origin}
            />
          </div>
        </div>
      </div>

      {/* Connecting lines overlay */}
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full" aria-hidden="true">
        <line x1="33%" y1="50%" x2="66%" y2="25%" className="stroke-gold/20" strokeWidth="1" />
        <line x1="33%" y1="50%" x2="66%" y2="75%" className="stroke-gold/20" strokeWidth="1" />
      </svg>
    </div>
  );
}
