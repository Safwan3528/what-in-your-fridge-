'use client';

import { createContext, useState, useContext } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="relative">
        <div className="absolute top-2 right-2 z-20">
          <LanguageSwitcher />
        </div>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}
