/* @section: layout-root */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Quote,
  Users,
  Tv,
  BookOpen,
  Lightbulb,
  Eye,
  Clock,
  Info,
  Menu,
  X,
  Search,
} from "lucide-react";

const navItems = [
  { label: "Início", href: "/", icon: Home },
  { label: "Frases", href: "/frases", icon: Quote },
  { label: "Personagens", href: "/personagens", icon: Users },
  { label: "Episódios", href: "/episodios", icon: Tv },
  { label: "Mangá", href: "/manga", icon: BookOpen },
  { label: "Curiosidades", href: "/curiosidades", icon: Lightbulb },
  { label: "Simbolismos", href: "/simbolismos", icon: Eye },
  { label: "Linha do Tempo", href: "/linha-do-tempo", icon: Clock },
  { label: "Sobre", href: "/sobre", icon: Info },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="dark min-h-screen bg-background flex">
      {/* @section: sidebar-desktop */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-sidebar sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="block group">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-sm bg-primary/20 border border-primary/40 flex items-center justify-center">
                <span className="text-primary text-xs font-bold" style={{ fontFamily: "'Cinzel', serif" }}>B</span>
              </div>
              <span
                className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase group-hover:text-primary transition-colors duration-200"
              >
                BERSERK
              </span>
            </div>
            <h1
              className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-200"
              style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.05em" }}
            >
              Archive Brasil
            </h1>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 group ${
                  active
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon
                  size={15}
                  className={`shrink-0 transition-colors duration-200 ${active ? "text-primary" : "group-hover:text-foreground"}`}
                />
                <span className="font-medium">{item.label}</span>
                {active && (
                  <div className="ml-auto w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground/60 leading-relaxed">
            Arquivo criado por fãs. Berserk © Kentaro Miura.
          </p>
        </div>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-border z-50 lg:hidden flex flex-col overflow-y-auto"
            >
              <div className="p-5 border-b border-border flex items-center justify-between">
                <Link to="/" className="block">
                  <span className="text-xs tracking-widest text-muted-foreground uppercase">BERSERK</span>
                  <h1
                    className="text-base font-bold text-foreground"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Archive Brasil
                  </h1>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                        active
                          ? "bg-primary/15 text-primary border border-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <Icon size={15} className="shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* @section: topbar */}
        <header
          className={`sticky top-0 z-30 flex items-center gap-4 px-4 lg:px-6 h-14 border-b transition-all duration-300 ${
            scrolled
              ? "bg-background/95 border-border shadow-sm"
              : "bg-background/80 border-transparent"
          } backdrop-blur-sm`}
        >
          <button
            className="lg:hidden p-2 -ml-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 flex items-center gap-3">
            <span
              className="hidden sm:block text-sm font-semibold text-muted-foreground/60 tracking-widest uppercase"
              style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem" }}
            >
              Berserk Archive Brasil
            </span>
          </div>

          <Link
            to="/#search"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground bg-muted/40 border border-border hover:border-primary/40 hover:text-foreground transition-all duration-200"
          >
            <Search size={14} />
            <span className="hidden sm:block">Pesquisar...</span>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>

        {/* @section: footer */}
        <footer className="border-t border-border bg-card/50 px-4 lg:px-8 py-8 mt-16">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px flex-1 bg-border max-w-32" />
              <span
                className="text-primary text-sm font-bold tracking-widest uppercase"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                BERSERK ARCHIVE BRASIL
              </span>
              <div className="h-px flex-1 bg-border max-w-32" />
            </div>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Este projeto é uma homenagem feita por fãs. Berserk e seus personagens pertencem a Kentaro Miura
              e aos respectivos detentores dos direitos autorais. Este site possui finalidade exclusivamente
              informativa e educativa.
            </p>
            <p className="text-xs text-muted-foreground/40">
              Berserk Archive Brasil — Um arquivo criado por fãs para preservar os momentos mais marcantes de Berserk.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
