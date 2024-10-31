"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import RecipeSearch from "./components/RecipeSearch";
import RecipeModal from "./components/RecipeModal";
import { useLanguage } from "./components/LanguageProvider";
import { useDarkMode } from "./components/DarkModeProvider";
import ChatBox from "./components/ChatBox";

export default function Home() {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const content = {
    en: {
      title: "What's in Your Fridge?",
      subtitle: "Discover recipes based on the ingredients you have at home!",
      aiThinking: "AI is thinking...",
      loading: "Loading recipes...",
      viewRecipe: "View Recipe",
    },
    ms: {
      title: "Apa dalam Peti Sejuk Anda?",
      subtitle: "Temui resipi berdasarkan bahan-bahan yang anda ada di rumah!",
      aiThinking: "AI sedang berfikir...",
      loading: "Memuatkan resipi...",
      viewRecipe: "Lihat Resipi",
    },
  };

  const t = content[language];

  const searchRecipes = async (query) => {
    setIsLoading(true);
    setLoadingStage("aiThinking");
    setRecipes(null);

    const APP_ID = process.env.NEXT_PUBLIC_EDAMAM_APP_ID;
    const APP_KEY = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY;

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setLoadingStage("loading");

      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setRecipes(data.hits);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
      setLoadingStage("");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } relative flex flex-col`}
    >
      <Navbar />
      <main className="container mx-auto px-4 py-16 pt-24 flex-grow">
        <div className="text-center">
          <h1
            className={`text-4xl font-bold ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            } mb-4`}
          >
            {t.title}
          </h1>
          <p
            className={`text-xl ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } mb-8`}
          >
            {t.subtitle}
          </p>
          <RecipeSearch onSearch={searchRecipes} isLoading={isLoading} />
        </div>

        {isLoading && (
          <div className="text-center mt-8">
            <p className="text-xl font-semibold">
              {loadingStage === "aiThinking" ? t.aiThinking : t.loading}
            </p>
          </div>
        )}

        {recipes && recipes.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipeItem, index) => (
              <div
                key={index}
                className={`border rounded-md p-4 shadow-md ${
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                }`}
              >
                <img
                  src={recipeItem.recipe.image}
                  alt={recipeItem.recipe.label}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {recipeItem.recipe.label}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Calories: {Math.round(recipeItem.recipe.calories)}
                </p>
                <button
                  onClick={() => setSelectedRecipe(recipeItem.recipe)}
                  className={`mt-2 px-4 py-2 rounded ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  {t.viewRecipe}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <div className="mb-16"></div>{" "}
      {/* kalau nak naikan footer, boleh tambah margin */}
      <ChatBox />
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
