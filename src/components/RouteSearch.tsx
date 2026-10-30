import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Clock, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { allRoutes, type Route } from "@/data/routes";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface RouteSearchProps {
  onRouteSelect: (route: Route) => void;
  recentRouteIds: string[];
}

export function RouteSearch({ onRouteSelect, recentRouteIds }: RouteSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const filteredRoutes = useMemo(() => {
    if (!query.trim()) {
      // Show recent routes when no query
      const recentRoutes = recentRouteIds
        .map(id => allRoutes.find(r => r.id === id))
        .filter(Boolean) as Route[];
      return recentRoutes.length > 0 ? recentRoutes : allRoutes.slice(0, 6);
    }
    
    const lowerQuery = query.toLowerCase();
    return allRoutes
      .filter(route => 
        route.from.toLowerCase().includes(lowerQuery) ||
        route.to.toLowerCase().includes(lowerQuery) ||
        route.name.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8);
  }, [query, recentRouteIds]);

  const handleSelect = (route: Route) => {
    onRouteSelect(route);
    setQuery("");
    setIsOpen(false);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors duration-200 pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10 h-12 rounded-xl bg-white/60 border-slate-200/80 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all duration-200 backdrop-blur-sm"
        />
        {query && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg transition-colors active:scale-95"
          >
            <X className="w-4 h-4 text-slate-400" />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, type: "spring", bounce: 0.3 }}
            className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-lg border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden z-50"
          >
            {!query && recentRouteIds.length > 0 && (
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-widest bg-slate-50/50">
                <Clock className="w-3.5 h-3.5" />
                {t('search.recent')}
              </div>
            )}
            
            <div className="max-h-72 overflow-y-auto">
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route, index) => (
                  <motion.button
                    key={route.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleSelect(route)}
                    className={cn(
                      "w-full px-4 py-3.5 text-left transition-all duration-200 group",
                      "flex items-center justify-between gap-2 border-b border-slate-100/50 last:border-0",
                      "hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 active:scale-98"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 group-hover:text-primary transition-colors truncate">{route.from} → {route.to}</p>
                      <p className="text-xs text-slate-500 group-hover:text-slate-600">
                        {route.city === 'chennai' ? '🏙️ Chennai' : '🏛️ Trichy'} • {route.name}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <motion.p 
                        whileHover={{ scale: 1.1 }}
                        className="text-sm font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg group-hover:bg-primary/20 transition-colors whitespace-nowrap"
                      >
                        {route.distance} km
                      </motion.p>
                    </div>
                  </motion.button>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-8 text-center"
                >
                  <div className="text-slate-400 mb-2">🔍</div>
                  <p className="text-slate-500 font-medium">{t('search.noResults')}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
