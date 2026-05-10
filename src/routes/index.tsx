import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, Salad, Sparkles, Truck, Check, Star, Quote, ShieldCheck, Zap, HeartPulse, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MealCard } from "@/components/MealCard";
import { meals } from "@/data/meals";
import heroBowl from "@/assets/hero-bowl.jpg";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Landing,
});

const TESTIMONIALS = [
  {
    name: "Aanya R.",
    role: "Product Designer · Bengaluru",
    quote: "Zestora replaced 4 takeout apps for me. My macros are tracked, my meals are in 25 minutes — it's unreal.",
  },
  {
    name: "Vikram S.",
    role: "Marathon runner · Mumbai",
    quote: "I gained 4 kg of lean mass in 8 weeks eating Zestora's Performance plan. Tastes like a chef's restaurant.",
  },
  {
    name: "Dr. Meera K.",
    role: "Diabetic-care patient · Pune",
    quote: "The diabetic kits keep my sugar steady and the dietitian chat answers my questions in minutes.",
  },
];

const TRUST = [
  { stat: "10,000+", label: "Meals delivered" },
  { stat: "25 min", label: "Avg delivery" },
  { stat: "4.9★", label: "Customer rating" },
  { stat: "100%", label: "Dietitian approved" },
];

const BENEFITS = [
  { icon: HeartPulse, title: "Personalized nutrition", desc: "Macros tuned to your body, goals and routine." },
  { icon: Zap, title: "Zero cooking stress", desc: "Pre-prepped kits ready to assemble in 10 minutes." },
  { icon: Truck, title: "Delivered in 25", desc: "From a micro dark store within 3 km of you." },
  { icon: ShieldCheck, title: "Macro-balanced", desc: "Every kit hits your protein, carb and fat targets." },
  { icon: Leaf, title: "Clean ingredients", desc: "No refined sugar, locally sourced produce." },
  { icon: Sparkles, title: "Dietitian approved", desc: "Designed and signed off by certified RDs." },
];

const PLANS = [
  { name: "Starter", price: 299, kits: "5 kits / week", featured: false, perks: ["Pick from 12 meals", "Free delivery > ₹399", "Cancel anytime"] },
  { name: "Performance", price: 399, kits: "10 kits / week", featured: true, perks: ["Pick from 24 meals", "Macro tracking", "Priority 25-min delivery", "1:1 dietitian chat"] },
  { name: "Elite", price: 499, kits: "18 kits / week", featured: false, perks: ["Full menu access", "Bespoke meal plans", "Dedicated dietitian", "Premium ingredients"] },
];

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

function Landing() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Toaster theme="dark" position="top-center" />
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full bg-primary/25 blur-[120px]" />
          <div className="absolute top-60 -right-32 h-[28rem] w-[28rem] rounded-full bg-primary-glow/20 blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Crafted by certified dietitians
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
              Healthy meals built for{" "}
              <span className="text-gradient">your body</span>, delivered in 25 minutes
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Personalized meal kits designed by dietitians and delivered ultra-fast from local micro kitchens.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow text-base h-12 px-7 font-semibold">
                  Get My Meal Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/" hash="how">
                <Button size="lg" variant="outline" className="h-12 px-7 border-border bg-surface/40 backdrop-blur font-medium">
                  How It Works
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> No cooking</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Cancel anytime</span>
              <span className="flex items-center gap-2"><Star className="h-4 w-4 text-primary fill-primary" /> 4.9 rating</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-30 blur-3xl rounded-full" />
            <motion.img
              src={heroBowl}
              alt="Zestora dietitian-crafted meal bowl"
              width={900}
              height={900}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="relative w-full rounded-[2rem] shadow-glow border border-border/60"
            />

            {/* Floating nutrition badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -left-4 top-10 bg-glass border border-primary/30 rounded-2xl p-3 shadow-card"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <HeartPulse className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Protein</p>
                  <p className="font-display text-sm font-bold">42 g</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -right-3 bottom-16 bg-glass border border-primary/30 rounded-2xl p-3 shadow-card"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Truck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">ETA</p>
                  <p className="font-display text-sm font-bold">25 min</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* TRUST METRICS */}
        <div className="container mx-auto px-4 pb-16">
          <div className="bg-glass border border-border/60 rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/60 overflow-hidden">
            {TRUST.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="px-6 py-6 text-center"
              >
                <p className="font-display text-2xl md:text-3xl font-bold text-gradient">{t.stat}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{t.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="container mx-auto px-4 py-24">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold">How it works</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">From your goal to your plate.</h2>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, title: "Choose your goal", desc: "Pick weight loss, muscle gain, diabetic-friendly, or vegan." },
            { icon: Salad, title: "Get personalized recommendations", desc: "Our AI matches you with macro-balanced kits weekly." },
            { icon: Truck, title: "Delivered fast, assemble in minutes", desc: "Pre-prepped kits arrive in 25 min. Plate it in 10." },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl bg-gradient-card border border-border/60 p-8 shadow-card hover:shadow-glow hover:border-primary/40 transition"
            >
              <span className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary font-display font-bold text-primary-foreground shadow-glow">
                {i + 1}
              </span>
              <s.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MEALS */}
      <section id="meals" className="container mx-auto px-4 py-12">
        <motion.div {...fadeUp} className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary font-semibold">This week's menu</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Featured meal kits</h2>
          </div>
          <Link to="/dashboard" className="text-sm text-primary hover:underline">See all in dashboard →</Link>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((m) => <MealCard key={m.id} meal={m} />)}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="container mx-auto px-4 py-24">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold">Why Zestora</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Built for the way <span className="text-gradient">you eat</span>.</h2>
        </motion.div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-gradient-card border border-border/60 p-6 shadow-card hover:shadow-glow hover:border-primary/40 transition"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-4 py-24">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold">Loved by</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">10,000+ healthy eaters.</h2>
        </motion.div>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 max-w-3xl mx-auto bg-gradient-card border border-border/60 rounded-3xl p-10 shadow-card relative"
        >
          <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/40" />
          <p className="text-xl md:text-2xl font-display leading-relaxed text-center">
            “{TESTIMONIALS[active].quote}”
          </p>
          <div className="mt-8 flex flex-col items-center">
            <p className="font-semibold">{TESTIMONIALS[active].name}</p>
            <p className="text-sm text-muted-foreground">{TESTIMONIALS[active].role}</p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="container mx-auto px-4 py-24">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold">Pricing</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Simple. Flexible. Yours.</h2>
          <p className="mt-3 text-muted-foreground">Per-meal pricing. Cancel or pause anytime.</p>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl border p-8 transition ${p.featured ? "border-primary/60 bg-gradient-card shadow-glow scale-[1.03]" : "border-border/60 bg-surface/40 hover:border-primary/40"}`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">Most popular</span>
              )}
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">₹{p.price}</span>
                <span className="text-muted-foreground">/meal</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.kits}</p>
              <ul className="mt-6 space-y-2">
                {p.perks.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <Link to="/auth" className="block mt-8">
                <Button className={`w-full ${p.featured ? "bg-gradient-primary text-primary-foreground hover:opacity-90" : ""}`} variant={p.featured ? "default" : "outline"}>
                  Choose {p.name}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 md:p-16 text-center shadow-glow"
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
          <h2 className="relative text-4xl md:text-5xl font-bold text-primary-foreground">Start eating smarter today</h2>
          <p className="relative mt-4 text-primary-foreground/80 text-lg max-w-xl mx-auto">Build your free profile and get a personalized menu in under 60 seconds.</p>
          <Link to="/auth" className="relative inline-block mt-8">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-base bg-background text-foreground hover:bg-background/90 shadow-card">
              Build My Meal Plan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
