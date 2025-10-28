import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import MealsPage from "./pages/MealsPage";
import RecipeDetails from "./pages/RecipeDetails";

import "./App.css";

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            fontSize: "16px",
            borderRadius: "10px",
            background: "#fff0f6",
            color: "#9d174d",
            border: "1px solid #fbcfe8",
            boxShadow: "0 4px 12px rgba(255, 182, 193, 0.4)",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meals" element={<MealsPage />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
