import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";
import { motion } from "framer-motion";
import bg from "../assets/bg.jpeg";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Home() {
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // keep it updated favorites change in localStorage
  useEffect(() => {
    const updateCount = () => {
      const stored = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavCount(stored.length);
    };
    updateCount();
    window.addEventListener("storage", updateCount);

    return () => window.removeEventListener("storage", updateCount);
  }, []);

  //  The async function
  const fetchRecipies = async () => {
    if (!ingredient.trim()) return;

    setLoading(true);
    setError("");

    const ingredientsArray = ingredient
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    try {
      // fetch all ingredients in parallel
      const responses = await Promise.all(
        ingredientsArray.map((ing) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
        )
      );

      const dataArray = await Promise.all(responses.map((res) => res.json()));

      // get list of meal IDs for each ingredient
      const mealIdLists = dataArray.map((data) =>
        data.meals ? data.meals.map((meal) => meal.idMeal) : []
      );

      // find common meal IDs (intersection)
      const commonMealIds = mealIdLists.reduce((a, b) =>
        a.filter((id) => b.includes(id))
      );

      // get meal details for only common ones
      const allMeals = dataArray.flatMap((d) => d.meals || []);
      const filteredMeals = allMeals.filter(
        (meal, index, self) =>
          commonMealIds.includes(meal.idMeal) &&
          index === self.findIndex((m) => m.idMeal === meal.idMeal)
      );

      console.log("FILTERED MEALS:", filteredMeals);

      if (filteredMeals.length > 0) {
        localStorage.setItem("recipes", JSON.stringify(filteredMeals));
        navigate("/meals");
      } else {
        setError("No recipes found with all those ingredients :(");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col p-6"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Header */}
      <div className="relative z-10 text-left text-white max-w-3xl w-full px-6 mt-12 md:mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Delicious Recipes 🍽️
        </h1>
        <p className="text-lg mb-6 opacity-90 text-center">
          Type one or more ingredients (e.g. chicken, tomato, onion)
        </p>
      </div>

      {/* Search Section */}
      <div className="relative z-10 w-full max-w-2xl mt-6">
        <SearchBar
          ingredient={ingredient}
          setIngredient={setIngredient}
          onSearch={fetchRecipies}
        />
        {error && <p className="text-red-300 mt-4 text-center">{error}</p>}
        {/* favorite button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => navigate("/favorites")}
          className="mt-6 flex flex-col items-center text-white cursor-pointer"
        >
          <motion.div
            whileHover={{
              scale: 1.2,
              boxShadow: "0 0 20px rgba(255, 0, 100, 0.8)",
            }}
            className="p-3 bg-white/10 rounded-full backdrop-blur-md border border-white/30"
          >
            <FaHeart className="text-pink-400 w-8 h-8 fill-pink-500 drop-shadow-[0_0_10px_#ff1493]" />
            {favCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
              >
                {favCount}
              </motion.div>
            )}
          </motion.div>
          <p className="mt-2 text-lg font-semibold">Favorites</p>
        </motion.div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 bg-black/60 flex justify-center items-center z-20">
          <Loader />
        </div>
      )}
    </div>
  );
}
