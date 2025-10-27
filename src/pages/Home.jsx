import React, { useState } from "react";
import bg from "../assets/bg.jpeg";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Home() {
  // create state variables
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // fetch logic
  const fetchRecipies = async () => {
    if (!ingredient.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (data.meals) {
        // save to local storage for next pages
        localStorage.setItem("recipes", JSON.stringify(data.meals));

        // redirected to meal pages
        navigate("/meals");
      } else {
        setError("No recipes found :(");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col  p-6"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Header Section — top area */}
      <div className="relative z-10 text-left text-white max-w-3xl w-full px-6 mt-12 md:mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Delicious Recipes 🍽️
        </h1>
        <p className="text-lg mb-6 opacity-90 text-center">
          Type an ingredient and get meal ideas instantly!
        </p>
      </div>

      {/* Search Section — centered */}

      <div className="relative z-10 w-full max-w-2xl mt-6">
        <SearchBar
          ingredient={ingredient}
          setIngredient={setIngredient}
          onSearch={fetchRecipies}
        />
        {error && <p className="text-red-300 mt-4">{error}</p>}
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black/60 flex justify-center items-center z-20">
          <Loader />
        </div>
      )}
    </div>
  );
}
