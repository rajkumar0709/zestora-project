import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowRight, MapPin, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { meals } from "@/data/meals";
import { getProfile } from "@/lib/profile";
import { getAddress, saveAddress, savePendingOrder, buildOrderFromMeal } from "@/lib/order";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    meal: typeof search.meal === "string" ? search.meal : "",
  }),
  head: () => ({
    meta: [
      { title: "Delivery details — Zestora" },
      { name: "description", content: "Confirm your delivery address to place the order." },
    ],
  }),
  component: CheckoutPage,
});

const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  mobile: z.string().trim().regex(/^[0-9+\s-]{7,15}$/, "Enter a valid mobile number"),
  address: z.string().trim().min(8, "Address is too short").max(240),
  landmark: z.string().trim().min(2, "Enter a landmark").max(120),
  pincode: z.string().trim().regex(/^[0-9]{4,8}$/, "Enter a valid pincode"),
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { meal: mealId } = Route.useSearch();
  const meal = meals.find((m) => m.id === mealId) ?? meals[0];

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    address: "",
    landmark: "",
    pincode: "",
  });

  useEffect(() => {
    const saved = getAddress();
    const profile = getProfile();
    if (saved) {
      setForm(saved);
    } else if (profile) {
      setForm((f) => ({
        ...f,
        fullName: profile.fullName,
        mobile: profile.phone,
        address: profile.location,
      }));
    }
  }, []);

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    const parsed = addressSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check your details");
      return;
    }
    saveAddress(parsed.data);
    savePendingOrder(buildOrderFromMeal(meal, parsed.data, 1));
    toast.success("Address confirmed");
    navigate({ to: "/payment" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster theme="dark" position="top-center" />
      <Header />

      <section className="container mx-auto px-4 py-10">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold">
              <MapPin className="h-3.5 w-3.5" /> Step 1 of 2
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold">Delivery details</h1>
            <p className="mt-2 text-muted-foreground">Tell us where to drop your kit. Estimated delivery in 25 minutes.</p>

            <form onSubmit={handleConfirm} className="mt-8 rounded-2xl bg-gradient-card border border-border/60 p-6 shadow-card space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Alex Carter" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile number</Label>
                <Input id="mobile" inputMode="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="+1 555 0100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Flat / building, street, city" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input id="landmark" value={form.landmark} onChange={(e) => setForm({ ...form, landmark: e.target.value })} placeholder="Near Central Park" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" inputMode="numeric" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder="560001" />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow h-11 mt-2">
                Confirm address <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          <aside>
            <div className="rounded-2xl bg-gradient-card border border-border/60 p-6 shadow-card sticky top-24">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Order summary</p>
              <div className="mt-4 flex gap-3">
                <img src={meal.image} alt={meal.name} className="h-16 w-16 rounded-lg object-cover" />
                <div>
                  <p className="font-display font-semibold leading-tight">{meal.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{meal.tagline}</p>
                </div>
              </div>
              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>₹{meal.price}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd className="text-primary">Free</dd></div>
                <div className="flex justify-between font-display text-lg font-bold pt-2 border-t border-border/60"><dt>Total</dt><dd>₹{meal.price}</dd></div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}