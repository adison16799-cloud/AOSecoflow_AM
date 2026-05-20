import { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import th from '../locales/th.json';

const LanguageContext = createContext();

const translations = { en, th };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('th');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('aeco-language');
      if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
      }
    } catch (error) {
      console.error('Failed to load language:', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('aeco-language', language);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  }, [language, isLoaded]);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const t = (key, defaultValue = key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
      if (!value) return defaultValue;
    }
    return value || defaultValue;
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, languages: Object.keys(translations) }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
