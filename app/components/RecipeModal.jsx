import { useState, useEffect } from 'react';
import { useDarkMode } from './DarkModeProvider';

export default function RecipeModal({ recipe, onClose }) {
  const { isDarkMode } = useDarkMode();
  const [isVisible, setIsVisible] = useState(false);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    // Simulation of getting cooking instructions
    setInstructions([
      "Preheat the oven to 350°F (175°C).",
      "Mix all ingredients in a large bowl.",
      "Pour the mixture into a baking dish.",
      "Bake for 30 minutes or until golden brown.",
      "Let it cool for 5 minutes before serving.",
      "Chat AI Chef Assistant for more detail or View original recipe",
    ]);
  }, []);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white dark:bg-gray-800 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">{recipe.label}</h2>
        <img src={recipe.image} alt={recipe.label} className="w-full h-64 object-cover rounded-lg mb-6 shadow-md" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-green-600 dark:text-green-400">Ingredients:</h3>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredientLines.map((ingredient, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-green-600 dark:text-green-400">Instructions:</h3>
            {instructions.length > 0 ? (
              <ol className="list-decimal list-inside space-y-2">
                {instructions.map((step, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{step}</li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 italic">Instructions are not available for this recipe.</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h4 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">Recipe Details:</h4>
          <p className="text-gray-700 dark:text-gray-300"><strong>Calories:</strong> {Math.round(recipe.calories)}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Total Time:</strong> {recipe.totalTime} minutes</p>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <a 
            href={recipe.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 underline"
          >
            View Original Recipe
          </a>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-200`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
