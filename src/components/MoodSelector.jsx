import React from "react";

const moods = [
  { emoji: "😋", label: "Hungry" },
  { emoji: "😌", label: "Lazy" },
  { emoji: "🥳", label: "Party" },
  { emoji: "🧘‍♀️", label: "Healthy" },
  { emoji: "🧁", label: "Sweet" },
];

export default function MoodSelector({ selectedMood, setSelectedMood }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6 mb-6">
      {moods.map((mood) => (
        <button
          key={mood.label}
          onClick={() =>
            setSelectedMood((prev) => (prev === mood.label ? "" : mood.label))
          }
          className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all ${
            selectedMood === mood.label
              ? "bg-pink-500 text-white scale-105 shadow-md"
              : "bg-white/10 text-white hover:bg-white/20 border border-white/30"
          }`}
        >
          <span className="text-2xl">{mood.emoji}</span>
          <span className="text-sm font-medium mt-1">{mood.label}</span>
        </button>
      ))}
    </div>
  );
}
