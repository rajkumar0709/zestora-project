import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" hash="how" className="hover:text-foreground transition">How it works</Link>
          <Link to="/" hash="meals" className="hover:text-foreground transition">Meals</Link>
          <Link to="/" hash="pricing" className="hover:text-foreground transition">Pricing</Link>
          <Link to="/dashboard" className="hover:text-foreground transition">Dashboard</Link>
          <Link to="/orders" className="hover:text-foreground transition">Orders</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/auth">
            <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
