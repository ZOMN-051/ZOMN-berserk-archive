export type ContentCategory =
  | "frase"
  | "cena"
  | "curiosidade"
  | "simbolismo"
  | "personagem"
  | "episodio"
  | "capitulo";

export interface Character {
  id: string;
  name: string;
  alias?: string;
  description: string;
  affiliation?: string;
  image?: string;
}

export interface ArticleMetadata {
  anime?: string;
  episode?: number;
  timestamp?: string;
  manga?: string;
  chapter?: number;
  characters: string[];
  categories: ContentCategory[];
  tags: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  context: string;
  quote?: string;
  quoteSource?: string;
  meaning: string;
  curiosity?: string;
  originStory?: string;
  metadata: ArticleMetadata;
  featured?: boolean;
  publishedAt: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: ContentCategory;
  slug: string;
}
