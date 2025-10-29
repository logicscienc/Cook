import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const handleToggleRavourite = (recipe) => {
    const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(
        (fav) => fav.idMeal !== recipe.idMeal
      );
      toast.error("Removed from Favorites 💔", {
        style: {
          borderRadius: "10px",
          background: "#fff1f2",
          color: "#be123c",
          border: "1px solid #fecdd3",
        },
        iconTheme: {
          primary: "#f43f5e",
          secondary: "#fff",
        },
      });
    } else {
      updatedFavorites = [...favorites, recipe];
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 800);

      toast.success("Added to Favorites ❤️", {
        style: {
          borderRadius: "10px",
          background: "#fff0f6",
          color: "#9d174d",
          border: "1px solid #fbcfe8",
        },
        iconTheme: {
          primary: "#ec4899",
          secondary: "#fff",
        },
      });
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();

        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];
          setRecipe(meal);
          fetchSimilarRecipes(meal.strCategory);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarRecipes = async (category) => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const data = await res.json();
        if (data.meals) {
          const filtered = data.meals.filter((m) => m.idMeal !== id);
          setSimilarRecipes(filtered.slice(0, 8));
        }
      } catch (err) {
        console.error("Error fetching similar recipes:", err);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const getIngredients = (meal) => {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        list.push(`${ingredient} - ${measure}`);
      }
    }
    return list;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-gray-700 p-6">
        <p className="text-xl mb-6">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-pink-500 text-white text-lg rounded-lg hover:bg-pink-600 transition"
        >
          ← Back to Recipes
        </button>
      </div>
    );

  const ingredients = getIngredients(recipe);

  return (
    <div className="relative min-h-screen overflow-hidden text-gray-800">
      {/* Animated Gradient Background */}
      <HomeButton />
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "linear-gradient(120deg, #fff3e0, #ffe4e1, #fff9c4)",
            "linear-gradient(120deg, #ffe0b2, #f8bbd0, #fffde7)",
            "linear-gradient(120deg, #fff3e0, #ffe4e1, #fff9c4)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundSize: "400% 400%",
          filter: "blur(60px)",
        }}
      />
     
      {[...Array(12)].map((_, i) => {
        const isLeft = i < 6;
        const emoji = ["🍕", "🍔", "🍩", "🍰", "🥐", "🍝"][i % 6];

        return (
          <motion.div
            key={i}
            className={`fixed text-4xl select-none pointer-events-none z-0 ${
              isLeft ? "left-[15%]" : "right-[15%]"
            }`}
            style={{
              top: `${Math.random() * 80 + 10}%`, 
              opacity: 0.5 + Math.random() * 0.4,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            }}
            animate={{
              y: [0, -30, 0],
              x: isLeft ? [0, 12, -12, 0] : [0, -12, 12, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        );
      })}

      {/*  Main Content Card */}
      <div className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-10 mt-10 border border-amber-100">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-xl text-gray-700 hover:text-pink-600 font-medium flex items-center gap-2 transition"
          >
            ← Back to Recipes
          </button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-10"
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl flex-shrink-0"
            >
              <div className="relative w-full md:w-[480px]">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-auto rounded-2xl object-contain bg-white"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

                {/*  Favorite Button */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleToggleRavourite(recipe)}
                    className="relative group flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-full bg-pink-200 opacity-0 group-hover:opacity-70 blur-xl transition duration-500"></div>

                    {/* Pulse animation when adding */}
                    {isAnimating && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-pink-300 blur-xl"
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    )}

                    {/* Sparkles */}
                    {isAnimating &&
                      [...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-pink-400 rounded-full"
                          initial={{
                            opacity: 1,
                            scale: 0.5,
                            x: 0,
                            y: 0,
                          }}
                          animate={{
                            opacity: 0,
                            scale: 1.5,
                            x: Math.cos((i * 60 * Math.PI) / 180) * 25,
                            y: Math.sin((i * 60 * Math.PI) / 180) * 25,
                          }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      ))}

                    {/* Heart Icon (changes color when favorited) */}

                    <div className="flex flex-col items-center relative z-10 text-pink-500">
                      <motion.div
                        animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        {favorites.some(
                          (fav) => fav.idMeal === recipe.idMeal
                        ) ? (
                          <FaHeart className="w-8 h-8 text-pink-500 drop-shadow-md" />
                        ) : (
                          <FaRegHeart className="w-8 h-8 text-pink-400 hover:text-pink-500 transition-colors" />
                        )}
                      </motion.div>

                      {/* Text Label */}
                      <motion.span
                        key={
                          favorites.some((fav) => fav.idMeal === recipe.idMeal)
                            ? "favorited"
                            : "favorite"
                        }
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="mt-1 text-sm font-medium text-gray-700"
                      >
                        {favorites.some((fav) => fav.idMeal === recipe.idMeal)
                          ? "Favorited"
                          : "Favorite"}
                      </motion.span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-5xl font-extrabold mb-4 text-pink-600 drop-shadow-sm">
                {recipe.strMeal}
              </h1>
              <p className="text-gray-700 mb-2 text-lg">
                <strong>Category:</strong> {recipe.strCategory || "N/A"}
              </p>
              <p className="text-gray-700 mb-4 text-lg">
                <strong>Area:</strong> {recipe.strArea || "N/A"}
              </p>

              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                Ingredients 
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                {ingredients.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h2 className="text-3xl font-semibold mb-3 text-gray-900">
              Instructions 
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {recipe.strInstructions}
            </p>
          </motion.div>

          {/* YouTube Video */}
          {recipe.strYoutube && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-14"
            >
              <h2 className="text-3xl font-semibold mb-4 text-gray-900">
                Watch Video 
              </h2>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={recipe.strYoutube.replace("watch?v=", "embed/")}
                  title="YouTube video"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          )}

          {/* Similar Recipes – Auto Slider */}
          {similarRecipes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center">
                Similar Recipes 
              </h2>

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 py-8 shadow-inner">
                <motion.div
                  className="flex gap-8"
                  animate={{ x: ["0%", "-100%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 25,
                    ease: "linear",
                  }}
                >
                  {[...similarRecipes, ...similarRecipes].map((meal, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.08, rotate: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      }}
                      onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                      className="cursor-pointer min-w-[260px] bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform"
                    >
                      <div className="relative">
                        <img
                          src={meal.strMealThumb}
                          alt={meal.strMeal}
                          className="w-full h-52 object-cover transition-transform duration-300 hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {meal.strMeal}
                        </h3>
                        <p className="text-sm text-amber-600 mt-1 font-medium">
                          Tap to explore →
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Gradient fade edges */}
                <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-amber-50 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-rose-50 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
