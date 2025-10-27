import React from "react";

export default function SearchBar({ingredient, setIngredient, onSearch}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(); // trigger parent function
  };
 
  return (
    <form
    onSubmit={handleSubmit}
    className="flex items-center justify-center gap-3"
  >
    <input
      type="text"
      value={ingredient}
      onChange={(e) => setIngredient(e.target.value)}
      placeholder="Enter an ingredient (e.g. chicken, tomato)"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
    />
    <button
      type="submit"
      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg transition"
    >
      Search
    </button>
  </form>
  )
  
}
