// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        ❤️ Your Favorite Recipes
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          Oops! There's nothing you’ve chosen yet 😔
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {favorites.map((recipe) => (
            <motion.div
              key={recipe.idMeal}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => handleRecipeClick(recipe.idMeal)}
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-white"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {recipe.strMeal}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
