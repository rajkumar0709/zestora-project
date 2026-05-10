import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, ArrowLeft, Clock, MapPin, CreditCard } from "lucide-react";
import { getOrderHistory, type OrderRecord } from "@/lib/order";
import { getProfile } from "@/lib/profile";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Order history — Zestora" },
      { name: "description", content: "All your past Zestora meal kit orders." },
    ],
  }),
  component: OrdersPage,
});

const PAYMENT_LABELS: Record<OrderRecord["paymentMethod"], string> = {
  card: "Credit / Debit card",
  upi: "UPI",
  wallet: "Wallet",
  cod: "Cash on delivery",
};

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderRecord[] | null>(null);

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      navigate({ to: "/auth" });
      return;
    }
    setOrders(getOrderHistory());
  }, [navigate]);

  if (orders === null) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="container mx-auto px-4 py-10">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>

        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold">
              <Package className="h-3.5 w-3.5" /> Order history
            </span>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold">All your orders</h1>
            <p className="mt-2 text-muted-foreground">Every Zestora kit you've ordered, in one place.</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border/60 bg-gradient-card p-10 text-center shadow-card">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Package className="h-7 w-7" />
            </div>
            <h2 className="font-display text-2xl font-bold">No orders yet</h2>
            <p className="mt-2 text-muted-foreground">Browse the menu and place your first order.</p>
            <Link to="/dashboard" className="inline-block mt-6">
              <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">Explore meals</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="rounded-2xl border border-border/60 bg-gradient-card p-6 shadow-card">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-semibold">{o.id}</span>
                      <Badge variant="secondary" className="bg-primary/15 text-primary border-0">{o.status}</Badge>
                    </div>
                    <p className="mt-1 text-lg font-medium">{o.mealName} <span className="text-muted-foreground">× {o.quantity}</span></p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(o.placedAt)}</p>
                  </div>
                  <span className="font-display text-2xl font-bold">₹{o.price * o.quantity}</span>
                </div>

                <div className="mt-5 grid sm:grid-cols-3 gap-4 pt-5 border-t border-border/60 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">Delivered to</p>
                      <p className="mt-1">{o.address.fullName}</p>
                      <p className="text-muted-foreground text-xs">{o.address.address}, {o.address.pincode}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CreditCard className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">Payment</p>
                      <p className="mt-1">{PAYMENT_LABELS[o.paymentMethod]}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">ETA</p>
                      <p className="mt-1">~{o.etaMinutes} minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}