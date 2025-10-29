import React from "react";

export default function SearchBar({ ingredient, setIngredient, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-3 mt-4"
    >
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Enter ingredients (e.g. chicken, tomato)"
        className="w-full max-w-md px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
      />

      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 shadow-md transition-all hover:scale-105"
      >
        Search
      </button>
    </form>
  );
}
