import meal1 from "@/assets/meal-1.jpg";
import meal2 from "@/assets/meal-2.jpg";
import meal3 from "@/assets/meal-3.jpg";
import meal4 from "@/assets/meal-4.jpg";

export type Diet = "veg" | "vegan" | "keto" | "high-protein" | "balanced";
export type Goal = "weight-loss" | "muscle-gain" | "maintain" | "diabetic";

export interface Meal {
  id: string;
  name: string;
  tagline: string;
  image: string;
  calories: number;
  protein: number;
  prepMinutes: number;
  price: number;
  diet: Diet[];
  goals: Goal[];
}

export const meals: Meal[] = [
  {
    id: "protein-builder",
    name: "Protein Builder Bowl",
    tagline: "Grilled chicken, quinoa, roasted veg",
    image: meal4,
    calories: 580,
    protein: 48,
    prepMinutes: 7,
    price: 349,
    diet: ["high-protein", "balanced"],
    goals: ["muscle-gain", "diabetic"],
  },
  {
    id: "green-keto",
    name: "Green Keto Crunch",
    tagline: "Avocado, salmon, asparagus, lemon-butter",
    image: meal2,
    calories: 610,
    protein: 42,
    prepMinutes: 10,
    price: 449,
    diet: ["keto", "high-protein"],
    goals: ["muscle-gain", "weight-loss"],
  },
  {
    id: "lean-wrap-pro",
    name: "Lean Wrap Pro",
    tagline: "Mediterranean falafel, hummus, ancient grains",
    image: meal1,
    calories: 520,
    protein: 24,
    prepMinutes: 8,
    price: 299,
    diet: ["veg", "balanced"],
    goals: ["maintain", "weight-loss"],
  },
  {
    id: "vegan-power",
    name: "Vegan Power Box",
    tagline: "Crispy tofu, edamame, brown rice",
    image: meal3,
    calories: 480,
    protein: 22,
    prepMinutes: 9,
    price: 319,
    diet: ["vegan", "veg"],
    goals: ["weight-loss", "maintain"],
  },
];

export const dietOptions: { value: Diet; label: string }[] = [
  { value: "balanced", label: "Balanced" },
  { value: "veg", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "keto", label: "Keto" },
  { value: "high-protein", label: "High Protein" },
];

export const goalOptions: { value: Goal; label: string }[] = [
  { value: "weight-loss", label: "Weight Loss" },
  { value: "muscle-gain", label: "Muscle Gain" },
  { value: "maintain", label: "Maintain" },
  { value: "diabetic", label: "Diabetic Friendly" },
];
