// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

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

  const handleRemoveFavorite = (idMeal) => {
    const updated = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    toast.success("Removed from Favorites 💔");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-8">
      <HomeButton /> 
      <h1 className="text-4xl font-extrabold text-center mb-10 text-orange-700 drop-shadow-md">
        Your Favorite Recipes ❤️
      </h1>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-gray-600 text-xl mt-20"
        >
          <p>😔 Oops! There’s nothing you’ve chosen yet.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-700 transition-all"
          >
            Go Back Home
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {favorites.map((recipe) => (
            <motion.div
              key={recipe.idMeal}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative rounded-2xl overflow-hidden shadow-xl bg-white hover:shadow-2xl transition cursor-pointer"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                onClick={() => handleRecipeClick(recipe.idMeal)}
              />

              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  {recipe.strMeal}
                </h2>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleRecipeClick(recipe.idMeal)}
                    className="px-4 py-1.5 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(recipe.idMeal)}
                    className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
