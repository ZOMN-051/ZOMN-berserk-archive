/* @section: article-card */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
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

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        to={`/artigo/${article.slug}`}
        className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-[0_8px_30px_-6px_oklch(0.65_0.14_50_/_0.12)] h-full"
      >
        {/* Image */}
        {article.image && (
          <div className="aspect-[16/7] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
            />
          </div>
        )}
        {!article.image && (
          <div className="aspect-[16/7] bg-gradient-to-br from-muted to-card flex items-center justify-center">
            <div
              className="text-4xl font-bold text-primary/20"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              B
            </div>
          </div>
        )}

        <div className="p-5">
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {article.metadata.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border tracking-wide uppercase ${categoryColors[cat] || ""}`}
              >
                {categoryLabels[cat] || cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2 leading-snug"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
              {article.metadata.anime && (
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  Ep. {article.metadata.episode}
                </span>
              )}
              {article.metadata.manga && !article.metadata.anime && (
                <span className="flex items-center gap-1">
                  <BookOpen size={11} />
                  Cap. {article.metadata.chapter}
                </span>
              )}
              {article.metadata.characters.slice(0, 2).map((c) => (
                <span key={c} className="font-medium text-muted-foreground/70">{c}</span>
              ))}
            </div>
            <ArrowRight
              size={14}
              className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
