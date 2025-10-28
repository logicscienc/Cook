import React from "react";
import { useNavigate } from "react-router-dom";

export default function RecipeList({ recipes }) {
  const navigate = useNavigate();
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <div
          key={recipe.idMeal}
          onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {recipe.strMeal}
            </h2>
            <p className="text-sm text-gray-500 mt-1">ID: {recipe.idMeal}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
