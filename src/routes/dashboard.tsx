import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MealCard } from "@/components/MealCard";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { meals, dietOptions, goalOptions, type Diet, type Goal } from "@/data/meals";
import { getProfile, saveProfile, clearProfile, type Profile } from "@/lib/profile";
import { getOrderHistory, type OrderRecord } from "@/lib/order";
import { LogOut, Sparkles, Package, LayoutDashboard, Salad, User, Settings, Flame, Dumbbell, ShoppingBag, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — Zestora" },
      { name: "description", content: "Personalized meal kits, orders and profile." },
    ],
  }),
  component: Dashboard,
});

function formatOrderDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function greetingForNow() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [section, setSection] = useState<"overview" | "meals" | "orders" | "profile" | "settings">("overview");

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      navigate({ to: "/auth" });
      return;
    }
    setProfile(p);
    setDraft(p);
    setOrders(getOrderHistory());
  }, [navigate]);

  if (!profile || !draft) return null;

  const recommended = meals
    .filter((m) => m.diet.includes(profile.diet) || m.goals.includes(profile.goal))
    .concat(meals)
    .filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i)
    .slice(0, 4);

  const firstName = profile.fullName.split(" ")[0];

  const totalCalories = orders.reduce((sum, o) => {
    const m = meals.find((mm) => mm.id === o.mealId);
    return sum + (m?.calories ?? 0) * o.quantity;
  }, 0);
  const totalProtein = orders.reduce((sum, o) => {
    const m = meals.find((mm) => mm.id === o.mealId);
    return sum + (m?.protein ?? 0) * o.quantity;
  }, 0);
  const stats = [
    { icon: Flame, label: "Calories tracked", value: totalCalories.toLocaleString(), suffix: "kcal" },
    { icon: Dumbbell, label: "Protein target", value: `${totalProtein}`, suffix: "g" },
    { icon: ShoppingBag, label: "Meals ordered", value: `${orders.length}`, suffix: "" },
    { icon: Truck, label: "Delivery speed", value: "25", suffix: "min avg" },
  ];

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "meals", label: "Meal Plans", icon: Salad },
    { id: "orders", label: "Orders", icon: Package },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  function saveEdits() {
    if (!draft) return;
    saveProfile(draft);
    setProfile(draft);
    setEditing(false);
    toast.success("Profile updated");
  }

  function handleLogout() {
    clearProfile();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster theme="dark" position="top-center" />
      <Header />

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <nav className="bg-gradient-card border border-border/60 rounded-2xl p-3 shadow-card">
            {navItems.map((item) => {
              const isActive = section === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface/60"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="my-2 border-t border-border/60" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface/60 transition"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </nav>
        </aside>

        {/* Main */}
        <div className="space-y-10 min-w-0">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> {greetingForNow()} 👋
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold">Hey {firstName}, ready for today's nutrition?</h1>
            <p className="mt-2 text-muted-foreground">
              Kits matched to your <span className="text-foreground font-medium capitalize">{profile.diet.replace("-", " ")}</span> · <span className="text-foreground font-medium capitalize">{profile.goal.replace("-", " ")}</span> profile.
            </p>
          </motion.div>

          {(section === "overview" || section === "meals" || section === "orders") && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl bg-gradient-card border border-border/60 p-5 shadow-card hover:shadow-glow hover:border-primary/40 transition"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-3 font-display text-2xl font-bold">
                    {s.value} <span className="text-sm font-medium text-muted-foreground">{s.suffix}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          {(section === "overview" || section === "meals") && (
            <div>
            <h2 className="font-display text-2xl font-bold mb-5">Recommended for you</h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {recommended.map((m) => <MealCard key={m.id} meal={m} />)}
            </div>
            </div>
          )}

          {(section === "overview" || section === "orders") && (
            <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl font-bold">Recent orders</h2>
              {orders.length > 0 && (
                <Link to="/orders" className="text-sm text-primary hover:underline">View all</Link>
              )}
            </div>
            {orders.length === 0 ? (
              <div className="rounded-2xl border border-border/60 bg-gradient-card p-8 text-center shadow-card">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Package className="h-6 w-6" />
                </div>
                <p className="font-display font-semibold">No orders yet</p>
                <p className="text-sm text-muted-foreground mt-1">Pick a kit above to place your first order.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-border/60 bg-gradient-card divide-y divide-border/60 shadow-card overflow-hidden">
                {(section === "orders" ? orders : orders.slice(0, 3)).map((o) => (
                  <div key={o.id} className="p-5 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-semibold">{o.id}</span>
                        <Badge variant="secondary" className="bg-primary/15 text-primary border-0">{o.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{o.mealName} × {o.quantity}</p>
                      <p className="text-xs text-muted-foreground">{formatOrderDate(o.placedAt)}</p>
                    </div>
                    <span className="font-display text-lg font-bold">₹{o.price * o.quantity}</span>
                  </div>
                ))}
              </div>
            )}
            </div>
          )}

          {(section === "profile" || section === "settings") && (
            <div className="rounded-2xl bg-gradient-card border border-border/60 p-6 shadow-card max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary font-display font-bold text-primary-foreground text-lg">
                {firstName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-display font-semibold">{profile.fullName}</p>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
              </div>
            </div>

            {!editing ? (
              <>
                <dl className="mt-5 space-y-3 text-sm">
                  <Row label="Diet" value={dietOptions.find((d) => d.value === profile.diet)?.label ?? profile.diet} />
                  <Row label="Goal" value={goalOptions.find((g) => g.value === profile.goal)?.label ?? profile.goal} />
                  <Row label="Phone" value={profile.phone || "—"} />
                  <Row label="Location" value={profile.location || "—"} />
                </dl>
                <Button variant="outline" className="w-full mt-6 border-border" onClick={() => setEditing(true)}>Edit profile</Button>
              </>
            ) : (
              <div className="mt-5 space-y-3">
                <div className="space-y-1.5"><Label>Full name</Label><Input value={draft.fullName} onChange={(e) => setDraft({ ...draft, fullName: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Phone</Label><Input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Location</Label><Input value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} /></div>
                <div className="space-y-1.5">
                  <Label>Diet</Label>
                  <Select value={draft.diet} onValueChange={(v) => setDraft({ ...draft, diet: v as Diet })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{dietOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Goal</Label>
                  <Select value={draft.goal} onValueChange={(v) => setDraft({ ...draft, goal: v as Goal })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{goalOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button onClick={saveEdits} className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90">Save</Button>
                  <Button variant="ghost" onClick={() => { setDraft(profile); setEditing(false); }}>Cancel</Button>
                </div>
              </div>
            )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium capitalize text-right">{value}</dd>
    </div>
  );
}
