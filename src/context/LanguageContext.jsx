import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({
  language: 'es',
  setLanguage: () => {},
});

const SUPPORTED_LANGUAGES = ['es', 'en', 'zh'];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('es');

  const handleSetLanguage = (lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
