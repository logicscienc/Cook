import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function HomeButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // hide button on home page
  if (location.pathname === "/") return null;

  return (
    <button
  onClick={() => navigate("/")}
  className="fixed top-5 left-5 z-50 bg-pink-500/80 text-white p-3 rounded-full 
             shadow-lg hover:bg-pink-600 transition-all duration-300 
             backdrop-blur-md hover:scale-110"
  title="Go to Home"
>
  <FaHome size={22} />
</button>

  );
}
