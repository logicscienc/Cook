import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
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
          setRecipe(data.meals[0]);
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
          className="px-5 py-2 bg-pink-500 text-white rounded-lg text-lg hover:bg-pink-600 transition-all shadow-md hover:shadow-lg"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const ingredients = getIngredients(recipe);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 text-gray-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10">
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-red-400 text-white rounded-full text-base md:text-lg font-semibold shadow-md hover:shadow-lg transition-all"
        >
          ← Back to Recipes
        </motion.button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <motion.img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="rounded-2xl shadow-lg w-full md:w-1/2 object-cover shadow-2xl"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 140 }}
            viewport={{ once: true }}
          />

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {recipe.strMeal}
            </h1>
            <p className="text-gray-700 mb-2 text-lg">
              <strong>Category:</strong> {recipe.strCategory || "N/A"}
            </p>
            <p className="text-gray-700 mb-6 text-lg">
              <strong>Area:</strong> {recipe.strArea || "N/A"}
            </p>

            <h2 className="text-2xl font-semibold mb-3">Ingredients 🥣</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6 text-base">
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-3">Instructions 👨‍🍳</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
            {recipe.strInstructions}
          </p>
        </motion.div>

        {recipe.strYoutube && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold mb-4">Watch Video 🎥</h2>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={recipe.strYoutube.replace("watch?v=", "embed/")}
                title="YouTube video"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
