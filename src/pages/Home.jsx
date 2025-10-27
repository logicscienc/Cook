import React, { useState } from "react";
import bg from "../assets/bg.jpeg";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Home() {
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

