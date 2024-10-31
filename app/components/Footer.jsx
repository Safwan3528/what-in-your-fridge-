'use client';

import { useLanguage } from './LanguageProvider';
import { useDarkMode } from './DarkModeProvider';

export default function Footer() {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const currentYear = new Date().getFullYear();

  const content = {
    en: {
      rights: "All Rights Reserved",
      group: "Group 5 BTE1034"
    },
    ms: {
      rights: "Hak Cipta Terpelihara",
      group: "Kumpulan 5 BTE1034"
    }
  };

  const t = content[language];

  return (
    <footer className={`py-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}>
      <div className="container mx-auto text-center">
        <p>
          &copy; {currentYear} {t.rights} | {t.group}
        </p>
      </div>
    </footer>
  );
}
