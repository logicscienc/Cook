# 🧁 Cook – Recipe Finder App  

## 👩‍💻 Overview  
**Cook** is a recipe search app built for **Taylor**, a busy professional who wants quick meal ideas based on ingredients, mood, and cooking time.  
It helps users explore recipes effortlessly using *TheMealDB* public API.  

---

## 🚀 Live Demo  
🔗 **Live URL:** [https://cook-pi.vercel.app](https://cook-pi.vercel.app)

---

## 💡 Features  
- 🔍 Search recipes by ingredient (e.g., “chicken”, “tomato”)  
- ⏱️ Filter by cooking time (quick, moderate, long)  
- 😋 Mood-based suggestions (comfort food, healthy, etc.)  
- ❤️ Add recipes to favorites  
- ⚙️ Smooth animations and transitions (Framer Motion)  
- 📱 Responsive and mobile-friendly UI  

---

## 🧠 Working with AI (Level 1)
To design and build this app, I used ChatGPT for guidance on:  
- Structuring the project flow and components  
- Deciding the UI/UX layout  
- Handling “no results” / “API error” states  
- Creating reusable components like `RecipeList`, `SearchBar`, and `MoodSelector`  

📎 **AI Chat Link:** [ChatGPT Conversation](https://chatgpt.com/share/690214ec-ca60-8000-820f-79e0ca6037bf)

---

## 🧩 Tech Stack  
| Category | Tools |
|-----------|--------|
| Framework | React + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| API | [TheMealDB](https://www.themealdb.com/api.php) |
| Hosting | Vercel |
| Package Manager | pnpm |

---

## 🧪 How to Run Locally  

1. **Clone this repository**  
   ```bash
   git clone https://github.com/logicscienc/Cook.git
   cd Cook
Install dependencies

pnpm install


Run the development server

pnpm run dev


Open your browser at

http://localhost:5173                                                                                                         ⚠️ Error Handling

Shows “No recipes found” when API returns empty results

Displays friendly messages during API loading or errors

Prevents blank searches

🧾 Submission Summary
Level	Requirement	Status
Level 1	Working with AI (ChatGPT link)	✅
Level 2	Working Application (Deployed)	✅
Level 3	Code & README shared	✅            
