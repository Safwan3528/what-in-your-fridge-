'use client';

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { useDarkMode } from "./DarkModeProvider";

export default function Navbar() {
  const { language } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="sticky top-2 left-0 right-0 z-10 flex justify-center">
      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full shadow-lg`}>
        <div className="px-4 py-2">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/ai_chef.png"
                alt="What's in Your Fridge Logo"
                width={40}
                height={40}
                className={`${isDarkMode ? 'invert' : ''}`}
              />
            </Link>
            <div className="flex space-x-4 items-center">
              <Link href="/" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} text-sm`}>
                {language === 'en' ? "Home" : "Laman Utama"}
              </Link>
              <Link href="/about" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} text-sm`}>
                {language === 'en' ? "About" : "Tentang Kami"}
              </Link>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-800'}`}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
