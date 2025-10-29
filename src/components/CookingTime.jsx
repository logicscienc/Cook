import React from "react";

const options = ["All", "Under 15 min", "Under 30 min", "Under 1 hr"];

export default function CookingTime({ selectedTime, setSelectedTime }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {options.map((time) => (
        <button
          key={time}
          onClick={() => setSelectedTime(time)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
            selectedTime === time
              ? "bg-pink-500 text-white shadow-md scale-105"
              : "bg-white/10 border-white/30 text-white hover:bg-white/20"
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
