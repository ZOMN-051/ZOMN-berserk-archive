/* @section: search-bar */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { searchArticles } from "@/data/articles";
import type { Article } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  frase: "Frase",
  cena: "Cena",
  curiosidade: "Curiosidade",
  simbolismo: "Simbolismo",
  personagem: "Personagem",
  episodio: "Episódio",
  capitulo: "Capítulo",
};

const categoryColors: Record<string, string> = {
  frase: "text-primary border-primary/30 bg-primary/10",
  cena: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  curiosidade: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  simbolismo: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  personagem: "text-green-400 border-green-400/30 bg-green-400/10",
  episodio: "text-red-400 border-red-400/30 bg-red-400/10",
  capitulo: "text-orange-400 border-orange-400/30 bg-orange-400/10",
};

const suggestions = [
  "personagem",
  "frase",
  "episódio",
  "capítulo",
  "curiosidade",
  "Judeau",
  "Guts",
  "Griffith",
  "Eclipse",
];

interface SearchBarProps {
  large?: boolean;
}

export default function SearchBar({ large = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const found = searchArticles(query);
    setResults(found.slice(0, 6));
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSuggestion = (s: string) => {
    setQuery(s);
    inputRef.current?.focus();
    setOpen(true);
  };

  const clear = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto" id="search">
      {/* Input */}
      <div
        className={`relative flex items-center bg-card border rounded-xl transition-all duration-300 ${
          open
            ? "border-primary/60 shadow-[0_0_0_3px_oklch(0.65_0.14_50_/_0.12)]"
            : "border-border hover:border-primary/30"
        } ${large ? "px-5 py-4" : "px-4 py-3"}`}
      >
        <Search
          size={large ? 20 : 16}
          className={`shrink-0 mr-3 transition-colors duration-200 ${open ? "text-primary" : "text-muted-foreground"}`}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Pesquisar personagem, frase, episódio, capítulo, curiosidade..."
          className={`flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none ${
            large ? "text-base" : "text-sm"
          }`}
        />
        {query && (
          <button
            onClick={clear}
            className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Suggestions (when empty) */}
      {large && !query && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="px-3 py-1.5 text-xs rounded-full border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-200 bg-muted/30"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Results dropdown */}
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {results.map((article, i) => (
              <Link
                key={article.id}
                to={`/artigo/${article.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors duration-150 group border-b border-border last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {article.title}
                    </span>
                    {article.metadata.categories.slice(0, 1).map((cat) => (
                      <span
                        key={cat}
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded border shrink-0 ${categoryColors[cat] || ""}`}
                      >
                        {categoryLabels[cat] || cat}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {article.excerpt}
                  </p>
                </div>
                <ArrowRight size={14} className="shrink-0 text-muted-foreground/40 group-hover:text-primary mt-1 transition-colors" />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results */}
      <AnimatePresence>
        {open && query.trim().length >= 2 && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-xl z-50 px-4 py-6 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Nenhum resultado para <span className="text-foreground font-medium">"{query}"</span>
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Este arquivo está em crescimento. Mais conteúdo em breve.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
