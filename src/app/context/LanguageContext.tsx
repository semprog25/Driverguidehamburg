import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language } from '@/app/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any; // Using any to support nested objects if needed, though strictly string usually
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('de'); // Default to German

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path} in language: ${language}`);
        // Fallback to English if missing
        let fallback: any = translations['en'];
        for (const fbKey of keys) {
           if (fallback[fbKey] === undefined) return path;
           fallback = fallback[fbKey];
        }
        return fallback;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
     // Return a dummy context to prevent crash if component is rendered in isolation (e.g. Figma preview)
    console.warn('useLanguage must be used within a LanguageProvider. Using default fallback.');
    return {
      language: 'en',
      setLanguage: () => {},
      t: (key: string) => key
    } as LanguageContextType;
  }
  return context;
}
