import React, { useEffect, useState } from "react";
import RecipeList from "../components/RecipeList";

export default function MealsPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("recipes");
    if (saved) setRecipes(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-700">
         Your Recipes
      </h1>

      {recipes.length > 0 ? (
        <RecipeList recipes={recipes} />
      ) : (
        <p className="text-center text-gray-600">No recipes found.</p>
      )}
    </div>
  );
}
