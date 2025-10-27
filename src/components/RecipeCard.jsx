import React from "react";

export default function RecipeCard({ meal }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {meal.strMeal}
        </h3>
      </div>
    </div>
  );
}
