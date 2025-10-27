import React from "react";
import bg from "../assets/bg.jpeg";

export default function Home() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center p-6"
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
        <p className="text-lg mb-6 opacity-90">
          Type an ingredient and get meal ideas instantly!
        </p>
      </div>

      {/* Search Section — centered */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1">
        <div className="flex justify-center mt-8">
          <input
            type="text"
            placeholder="Search for recipes..."
            className="px-4 py-2 w-72 md:w-96 rounded-l-md focus:outline-none text-black"
          />
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-r-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
