import Navbar from "./components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />
      <main className="container mx-auto px-4 py-16 pt-24">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">About What's in Your Fridge?</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 mb-6">
            "What's in Your Fridge?" is an innovative app designed to help you make the most of the ingredients you already have at home. Our mission is to reduce food waste, save you money, and inspire culinary creativity.
          </p>
          <p className="text-gray-700 mb-6">
            With our app, you can easily input the ingredients you have on hand, and we'll suggest delicious recipes that you can make right away. No more wondering what to cook or making unnecessary trips to the grocery store!
          </p>
          <p className="text-gray-700 mb-6">
            Whether you're a seasoned chef or a cooking novice, "What's in Your Fridge?" is here to make your culinary journey easier and more enjoyable. Start exploring new recipes and make the most of your ingredients today!
          </p>
        </div>
      </main>
    </div>
  );
}
