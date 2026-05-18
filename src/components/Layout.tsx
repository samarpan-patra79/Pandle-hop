import { Link, useLocation } from "wouter";
import { Home, Newspaper, Grid, Trophy, Map, Settings } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/feed", icon: Newspaper, label: "Feed" },
  { href: "/directory", icon: Grid, label: "Directory" },
  { href: "/leaderboard", icon: Trophy, label: "Ranking" },
  { href: "/planner", icon: Map, label: "Planner" },
  { href: "/admin", icon: Settings, label: "Admin" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop top nav */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-xs font-black text-primary">P</span>
          </div>
          <span className="text-xl font-black tracking-tight">PandalHop</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location === href
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              data-testid={`nav-${label.toLowerCase()}`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-xs font-black text-primary">P</span>
          </div>
          <span className="text-lg font-black tracking-tight">PandalHop</span>
        </Link>
        <span className="text-xs text-white/70 font-medium">Durga Puja 2024</span>
      </header>

      {/* Main content */}
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-xl z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                location === href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              data-testid={`mobile-nav-${label.toLowerCase()}`}
            >
              <Icon size={20} strokeWidth={location === href ? 2.5 : 1.8} />
              <span className="text-[10px] font-semibold">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
