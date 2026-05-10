import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo className="h-6 w-auto" />
          <span className="text-sm text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
        <p className="text-sm text-muted-foreground">Dietitian-crafted meals · Delivered in 25 min</p>
      </div>
    </footer>
  );
}
