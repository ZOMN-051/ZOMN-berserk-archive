import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "./pages/home/Index";
import ArticlePage from "./pages/article/Index";
import CategoryPage from "./pages/category/Index";
import SobrePage from "./pages/sobre/Index";
import NotFound from "./pages/not-found/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artigo/:slug" element={<ArticlePage />} />
            <Route path="/frases" element={<CategoryPage category="frase" />} />
            <Route path="/personagens" element={<CategoryPage category="personagem" />} />
            <Route path="/episodios" element={<CategoryPage category="episodio" />} />
            <Route path="/manga" element={<CategoryPage category="capitulo" />} />
            <Route path="/curiosidades" element={<CategoryPage category="curiosidade" />} />
            <Route path="/simbolismos" element={<CategoryPage category="simbolismo" />} />
            <Route path="/linha-do-tempo" element={<CategoryPage category="cena" label="Linha do Tempo" />} />
            <Route path="/sobre" element={<SobrePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
