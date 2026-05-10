import { Clock, Flame, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Meal } from "@/data/meals";

export function MealCard({ meal }: { meal: Meal }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-card border border-border/60 shadow-card transition hover:shadow-glow hover:border-primary/40"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {meal.diet.slice(0, 2).map((d) => (
            <Badge key={d} variant="secondary" className="bg-accent/20 text-accent-foreground border-0 capitalize">
              {d.replace("-", " ")}
            </Badge>
          ))}
        </div>
        <h3 className="font-display text-lg font-semibold leading-tight">{meal.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{meal.tagline}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-primary" />{meal.calories} kcal</span>
          <span className="flex items-center gap-1"><Dumbbell className="h-3.5 w-3.5 text-primary" />{meal.protein}g</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-primary" />{meal.prepMinutes} min</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-xl font-bold">₹{meal.price}</span>
          <Button
            size="sm"
            className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            onClick={() => navigate({ to: "/checkout", search: { meal: meal.id } })}
          >
            Order now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
