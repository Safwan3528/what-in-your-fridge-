'use client';

import { useState } from 'react';
import { useDarkMode } from './DarkModeProvider';
import { useLanguage } from './LanguageProvider';

export default function RecipeSearch({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const quickSearchTags = {
    en: ['Chicken', 'Lamb', 'Beef', 'Crab', 'Fish', 'Squid', 'Shrimp'],
    ms: ['Ayam', 'Kambing', 'Daging Lembu', 'Ketam', 'Ikan', 'Sotong', 'Udang']
  };

  const placeholderText = {
    en: "Enter ingredients...",
    ms: "Masukkan bahan-bahan..."
  };

  const handleQuickSearch = (tag) => {
    setQuery(tag);
    onSearch(tag);
  };

  return (
    <div className="mt-8 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholderText[language]}
          className={`w-full px-4 py-2 pr-12 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-500'
              : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'
          }`}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </form>
      <div className="flex flex-wrap justify-center mt-4 gap-2">
        {quickSearchTags[language].map((tag, index) => (
          <button
            key={index}
            onClick={() => handleQuickSearch(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              isDarkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } transition-colors duration-200`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
