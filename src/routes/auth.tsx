import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { saveProfile } from "@/lib/profile";
import { dietOptions, goalOptions, type Diet, type Goal } from "@/data/meals";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or join — Zestora" },
      { name: "description", content: "Create your Zestora profile and get personalized meal kits." },
    ],
  }),
  component: AuthPage,
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Min 6 characters").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  location: z.string().trim().min(2, "Required").max(120),
  diet: z.enum(["balanced", "veg", "vegan", "keto", "high-protein"]),
  goal: z.enum(["weight-loss", "muscle-gain", "maintain", "diabetic"]),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    diet: "balanced" as Diet,
    goal: "maintain" as Goal,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "signup") {
      const parsed = signupSchema.safeParse(form);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Check your details");
        return;
      }
      saveProfile({
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        location: parsed.data.location,
        diet: parsed.data.diet,
        goal: parsed.data.goal,
      });
      toast.success("Welcome to Zestora!");
      navigate({ to: "/dashboard" });
    } else {
      if (!form.email || !form.password) {
        toast.error("Enter email and password");
        return;
      }
      saveProfile({
        fullName: "Friend",
        email: form.email,
        phone: "",
        location: "",
        diet: "balanced",
        goal: "maintain",
      });
      toast.success("Signed in");
      navigate({ to: "/dashboard" });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-10">
      <Toaster theme="dark" position="top-center" />
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center mb-8">
          <Logo className="h-10 w-auto" />
        </Link>

        <div className="rounded-3xl bg-gradient-card border border-border/60 p-8 shadow-card">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted/40 p-1 mb-6">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`rounded-lg py-2 text-sm font-medium transition ${mode === "signin" ? "bg-background text-foreground shadow" : "text-muted-foreground"}`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-lg py-2 text-sm font-medium transition ${mode === "signup" ? "bg-background text-foreground shadow" : "text-muted-foreground"}`}
            >
              Create account
            </button>
          </div>

          <h1 className="font-display text-2xl font-bold">
            {mode === "signin" ? "Welcome back" : "Build your meal plan"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "signin" ? "Sign in to manage your kits." : "Takes under 60 seconds."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Alex Carter" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            </div>

            {mode === "signup" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 0100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Brooklyn, NY" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Diet</Label>
                    <Select value={form.diet} onValueChange={(v) => setForm({ ...form, diet: v as Diet })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {dietOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Goal</Label>
                    <Select value={form.goal} onValueChange={(v) => setForm({ ...form, goal: v as Goal })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {goalOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow h-11">
              {mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing you agree to our Terms & Privacy.
        </p>
      </div>
    </div>
  );
}
