import React, { useState } from "react";
import bg from "../assets/bg.jpeg";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";
import Loader from "../components/Loader";

export default function Home() {
  // create state variables
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch logic
  const fetchRecipies = async () => {
    if (!ingredient.trim()) return;
    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (data.meals) setRecipes(data.meals);
      else setError("No recipes found :(");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col  p-6"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Header Section — top area */}
      <div className="relative z-10 text-left text-white max-w-3xl w-full px-6 mt-12 md:mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Delicious Recipes 🍽️
        </h1>
        <p className="text-lg mb-6 opacity-90 text-center">
          Type an ingredient and get meal ideas instantly!
        </p>
      </div>

      {/* Search Section — centered */}

      <div className="relative z-10 w-full max-w-2xl mt-6">
        <SearchBar
          ingredient={ingredient}
          setIngredient={setIngredient}
          onSearch={fetchRecipies}
        />
      </div>
    </div>
  );
}
