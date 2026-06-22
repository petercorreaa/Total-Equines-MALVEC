import { useTranslation } from '@/hooks/useTranslation';

const colors = ['Zaino', 'Tordillo', 'Alazán', 'Oscuro', 'Bayo', 'Picazo', 'Tobiano'];

export default function FilterBar({ filters, setFilters, resultCount }) {
  const { t } = useTranslation();

  const sexOptions = [
    { value: '', label: t('ventas.filter_all') },
    { value: 'Yegua', label: t('attr.sex.Yegua') },
    { value: 'Castrado', label: t('attr.sex.Castrado') },
    { value: 'Macho', label: t('attr.sex.Macho') },
  ];

  const ageOptions = [
    { value: '', label: t('ventas.filter_age_all') },
    { value: '3-5', label: t('ventas.filter_age_young') },
    { value: '6-8', label: t('ventas.filter_age_mid') },
    { value: '9-12', label: t('ventas.filter_age_senior') },
  ];

  const handleReset = () =>
    setFilters({ sex: '', age: '', color: '' });

  const hasFilters = filters.sex || filters.age || filters.color;

  return (
    <div className="sticky top-20 lg:top-24 z-40 border-b border-gold/15 bg-gray-900/95 backdrop-blur-md">
      <div className="container-custom py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Sex pills */}
          <div className="flex flex-wrap gap-2">
            {sexOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilters((f) => ({ ...f, sex: opt.value }))}
                className={`rounded-full px-4 py-2 font-body text-xs uppercase tracking-widest transition-all duration-300 ${
                  filters.sex === opt.value
                    ? 'bg-gold text-black'
                    : 'border border-gray-600 text-gray-400 hover:border-gold/50 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="hidden h-6 w-px bg-gray-700 sm:block" />

          {/* Age pills */}
          <div className="flex flex-wrap gap-2">
            {ageOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilters((f) => ({ ...f, age: opt.value }))}
                className={`rounded-full px-4 py-2 font-body text-xs uppercase tracking-widest transition-all duration-300 ${
                  filters.age === opt.value
                    ? 'bg-gold text-black'
                    : 'border border-gray-600 text-gray-400 hover:border-gold/50 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="hidden h-6 w-px bg-gray-700 sm:block" />

          {/* Color select */}
          <select
            value={filters.color}
            onChange={(e) => setFilters((f) => ({ ...f, color: e.target.value }))}
            className="rounded-xl border border-gray-600 bg-gray-800 px-4 py-2 font-body text-sm text-white transition-colors focus:border-gold/50 focus:outline-none"
          >
            <option value="">{t('ventas.filter_color')}: {t('ventas.filter_all')}</option>
            {colors.map((c) => (
              <option key={c} value={c}>{t(`attr.color.${c}`)}</option>
            ))}
          </select>

          {/* Spacer */}
          <div className="hidden sm:flex sm:flex-1" />

          {/* Result count + reset */}
          <div className="flex items-center gap-4">
            <span className="font-body text-sm text-gray-400">
              {t('ventas.filter_results').replace('{count}', resultCount)}
            </span>
            {hasFilters && (
              <button
                onClick={handleReset}
                className="font-body text-xs text-gold underline transition-colors hover:text-gold-light"
              >
                {t('ventas.filter_reset')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
