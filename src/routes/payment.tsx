import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CreditCard, Wallet, Banknote, Smartphone, CheckCircle2, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { getPendingOrder, clearPendingOrder, addOrderToHistory, type PendingOrder } from "@/lib/order";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Payment — Zestora" },
      { name: "description", content: "Choose a payment method and place your order." },
    ],
  }),
  component: PaymentPage,
});

type Method = "card" | "upi" | "wallet" | "cod";

function PaymentPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [method, setMethod] = useState<Method>("cod");
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    const o = getPendingOrder();
    if (!o) {
      navigate({ to: "/dashboard" });
      return;
    }
    setOrder(o);
  }, [navigate]);

  if (!order) return null;

  function handlePlaceOrder() {
    if (order) addOrderToHistory(order, method);
    setPlaced(true);
  }

  function handleClose() {
    clearPendingOrder();
    setPlaced(false);
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster theme="dark" position="top-center" />
      <Header />

      <section className="container mx-auto px-4 py-10">
        <Link to="/checkout" search={{ meal: order.mealId }} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to address
        </Link>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold">
              <CreditCard className="h-3.5 w-3.5" /> Step 2 of 2
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold">Payment method</h1>
            <p className="mt-2 text-muted-foreground">All methods are secure. Choose what works for you.</p>

            <div className="mt-8 rounded-2xl bg-gradient-card border border-border/60 p-6 shadow-card">
              <RadioGroup value={method} onValueChange={(v) => setMethod(v as Method)} className="space-y-3">
                <PayOption value="card" icon={<CreditCard className="h-4 w-4" />} title="Credit / Debit card" subtitle="Visa, Mastercard, Amex" />
                <PayOption value="upi" icon={<Smartphone className="h-4 w-4" />} title="UPI" subtitle="Google Pay, PhonePe, Paytm" />
                <PayOption value="wallet" icon={<Wallet className="h-4 w-4" />} title="Wallet" subtitle="Paytm, Amazon Pay" />
                <PayOption value="cod" icon={<Banknote className="h-4 w-4" />} title="Cash on delivery" subtitle="Pay when your kit arrives" />
              </RadioGroup>

              {method === "card" && (
                <div className="mt-6 space-y-3 border-t border-border/60 pt-5">
                  <div className="space-y-1.5">
                    <Label>Card number</Label>
                    <Input placeholder="1234 5678 9012 3456" inputMode="numeric" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5"><Label>Expiry</Label><Input placeholder="MM / YY" /></div>
                    <div className="space-y-1.5"><Label>CVV</Label><Input placeholder="123" inputMode="numeric" /></div>
                  </div>
                </div>
              )}

              {method === "upi" && (
                <div className="mt-6 space-y-1.5 border-t border-border/60 pt-5">
                  <Label>UPI ID</Label>
                  <Input placeholder="yourname@upi" />
                </div>
              )}

              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow h-11 mt-6"
              >
                Place order · ₹{order.price}
              </Button>
            </div>
          </div>

          <aside>
            <div className="rounded-2xl bg-gradient-card border border-border/60 p-6 shadow-card sticky top-24">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Delivering to</p>
              <p className="font-display font-semibold mt-2">{order.address.fullName}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {order.address.address}<br />
                Near {order.address.landmark} · {order.address.pincode}<br />
                {order.address.mobile}
              </p>

              <div className="mt-5 pt-5 border-t border-border/60">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Order</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-medium">{order.mealName}</span>
                  <span>× {order.quantity}</span>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>₹{order.price}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd className="text-primary">Free</dd></div>
                  <div className="flex justify-between font-display text-lg font-bold pt-2 border-t border-border/60"><dt>Total</dt><dd>₹{order.price}</dd></div>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />

      <Dialog open={placed} onOpenChange={(o) => { if (!o) handleClose(); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <DialogTitle className="text-center font-display text-2xl">Order placed!</DialogTitle>
            <DialogDescription className="text-center">
              Your <span className="text-foreground font-medium">{order.mealName}</span> kit is on its way.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl bg-muted/40 border border-border/60 p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Clock className="h-4 w-4" />
              <span className="font-display font-semibold">Arriving in ~25 minutes</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Payment: {method === "cod" ? "Cash on delivery" : method.toUpperCase()}
            </p>
          </div>

          <DialogFooter className="sm:justify-center">
            <Button onClick={handleClose} className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">
              Back to dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PayOption({ value, icon, title, subtitle }: { value: string; icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <Label
      htmlFor={`pay-${value}`}
      className="flex items-center gap-4 rounded-xl border border-border/60 bg-background/40 p-4 cursor-pointer hover:border-primary/40 transition has-[:checked]:border-primary has-[:checked]:bg-primary/5"
    >
      <RadioGroupItem id={`pay-${value}`} value={value} />
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">{icon}</span>
      <span className="flex-1">
        <span className="block font-medium">{title}</span>
        <span className="block text-xs text-muted-foreground">{subtitle}</span>
      </span>
    </Label>
  );
}