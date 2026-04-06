import { useLanguage } from '@/context/LanguageContext';
import es from '@/i18n/es.json';
import en from '@/i18n/en.json';
import zh from '@/i18n/zh.json';

const translations = { es, en, zh };

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to Spanish
        let fallback = translations.es;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return fallback;
      }
    }

    return value;
  };

  return { t };
}
