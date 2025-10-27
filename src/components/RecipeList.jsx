import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return (
      <p className="text-center text-white/80 mt-10">
        Start by typing an ingredient above 🍅
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
      {recipes.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
