import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        console.log("RECIPE DETAILS API RESPONSE:", data);

        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];
          setRecipe(meal);

          // Fetch similar recipes by category
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
          // Filter out the current recipe itself
          const filtered = data.meals.filter((m) => m.idMeal !== id);
          setSimilarRecipes(filtered.slice(0, 6)); // show top 6 only
        }
      } catch (err) {
        console.error("Error fetching similar recipes:", err);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  // Extract ingredients + measures
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
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
  }

  const ingredients = getIngredients(recipe);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-lg text-gray-600 hover:text-pink-600 transition flex items-center gap-2"
        >
          ← Back to Recipes
        </button>

        {/* Recipe Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Image with hover zoom */}
          <motion.img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="rounded-xl shadow-xl w-full md:w-1/2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4 text-pink-600">
              {recipe.strMeal}
            </h1>
            <p className="text-gray-600 mb-2 text-lg">
              <strong>Category:</strong> {recipe.strCategory || "N/A"}
            </p>
            <p className="text-gray-600 mb-4 text-lg">
              <strong>Area:</strong> {recipe.strArea || "N/A"}
            </p>

            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Ingredients 🥣
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
          className="mt-10"
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Instructions 👨‍🍳
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
            className="mt-12"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Watch Video 🎥
            </h2>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
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

        {/* Similar Recipes */}
        {similarRecipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Similar Recipes 🍛
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarRecipes.map((meal, i) => (
                <motion.div
                  key={meal.idMeal}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className="cursor-pointer bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl"
                  onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3 text-center">
                    <h3 className="text-md font-semibold text-gray-800">
                      {meal.strMeal}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
