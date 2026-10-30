import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Sliders, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouteSearch } from "@/components/RouteSearch";
import { type Route } from "@/data/routes";
import { useLanguage } from "@/contexts/LanguageContext";

export interface SearchFilters {
  sortBy: "price" | "time" | "eco";
  maxPrice?: number;
  maxTime?: number;
  comfort: "any" | "ac" | "nonac";
}

interface SearchEnhancedProps {
  onRouteSelect: (route: Route) => void;
  recentRouteIds: string[];
  onFiltersChange?: (filters: SearchFilters) => void;
}

export function SearchEnhanced({
  onRouteSelect,
  recentRouteIds,
  onFiltersChange,
}: SearchEnhancedProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: "price",
    comfort: "any",
  });
  const { t } = useLanguage();

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange?.(updated);
  };

  const activeFilterCount = [
    filters.maxPrice !== undefined ? 1 : 0,
    filters.maxTime !== undefined ? 1 : 0,
    filters.comfort !== "any" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full space-y-3 md:space-y-4">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <RouteSearch onRouteSelect={onRouteSelect} recentRouteIds={recentRouteIds} />
      </motion.div>

      {/* Filter Toggle & Active Filters Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-2 md:gap-3"
      >
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant={showFilters ? "default" : "outline"}
          size="sm"
          className="rounded-lg flex items-center gap-2 text-xs md:text-sm relative"
          aria-label="Toggle search filters"
          aria-expanded={showFilters}
        >
          <Sliders size={16} />
          <span>{t('search.filters')}</span>
          {activeFilterCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold"
              aria-label={`${activeFilterCount} active filters`}
            >
              {activeFilterCount}
            </motion.span>
          )}
        </Button>

        {/* Active Filter Tags */}
        <AnimatePresence mode="popLayout">
          {filters.maxPrice && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleFilterChange({ maxPrice: undefined })}
              className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs md:text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              {t('search.maxPriceLabel', { val: filters.maxPrice.toString() })} ×
            </motion.button>
          )}
          {filters.maxTime && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleFilterChange({ maxTime: undefined })}
              className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs md:text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
            >
              {t('search.maxTimeLabel', { val: filters.maxTime.toString() })} ×
            </motion.button>
          )}
          {filters.comfort !== "any" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleFilterChange({ comfort: "any" })}
              className="px-3 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs md:text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors capitalize"
            >
              {filters.comfort === 'ac' ? t('search.ac') : t('search.nonac')} ×
            </motion.button>
          )}
        </AnimatePresence>

        {/* Clear All Button */}
        {activeFilterCount > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() =>
              handleFilterChange({
                maxPrice: undefined,
                maxTime: undefined,
                comfort: "any",
              })
            }
            className="text-xs md:text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
          >
            {t('search.clearAll')}
          </motion.button>
        )}
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 space-y-4"
          >
            {/* Sort Options */}
            <motion.div variants={itemVariants}>
              <label className="text-sm font-bold text-slate-900 dark:text-white block mb-3">
                {t('search.sortBy')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                {[
                  { value: "price" as const, label: `💰 ${t('search.cheapest')}`, desc: t('fare.bestPrice') },
                  { value: "time" as const, label: `⚡ ${t('search.fastest')}`, desc: t('search.fastest') },
                  { value: "eco" as const, label: `🌱 ${t('search.eco')}`, desc: t('search.eco') },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFilterChange({ sortBy: option.value })}
                    className={`p-3 rounded-xl text-sm font-medium transition-all text-center ${filters.sortBy === option.value
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-white dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600"
                      }`}
                    aria-pressed={filters.sortBy === option.value}
                  >
                    <div className="font-bold">{option.label}</div>
                    <div className="text-xs opacity-75">{option.desc}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Comfort Options */}
            <motion.div variants={itemVariants}>
              <label className="text-sm font-bold text-slate-900 dark:text-white block mb-3">
                {t('search.comfortLevel')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                {[
                  { value: "any" as const, label: `🚌 ${t('search.any')}` },
                  { value: "ac" as const, label: `❄️ ${t('search.ac')}` },
                  { value: "nonac" as const, label: `🌬️ ${t('search.nonac')}` },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFilterChange({ comfort: option.value })}
                    className={`p-3 rounded-lg font-medium transition-all ${filters.comfort === option.value
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                      : "bg-white dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600"
                      }`}
                    aria-pressed={filters.comfort === option.value}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Price Range */}
            <motion.div variants={itemVariants}>
              <label className="text-sm font-bold text-slate-900 dark:text-white block mb-3">
                {t('search.maxPrice')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                {[100, 200, 300, 500].map((price) => (
                  <motion.button
                    key={price}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      handleFilterChange({
                        maxPrice:
                          filters.maxPrice === price ? undefined : price,
                      })
                    }
                    className={`p-2 md:p-3 rounded-lg text-sm font-medium transition-all ${filters.maxPrice === price
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
                      }`}
                    aria-pressed={filters.maxPrice === price}
                  >
                    ₹{price}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Travel Time */}
            <motion.div variants={itemVariants}>
              <label className="text-sm font-bold text-slate-900 dark:text-white block mb-3">
                {t('search.travelTime')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                {[1, 2, 3, 4].map((hours) => (
                  <motion.button
                    key={hours}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      handleFilterChange({
                        maxTime: filters.maxTime === hours ? undefined : hours,
                      })
                    }
                    className={`p-2 md:p-3 rounded-lg text-sm font-medium transition-all ${filters.maxTime === hours
                      ? "bg-purple-500 text-white"
                      : "bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
                      }`}
                    aria-pressed={filters.maxTime === hours}
                  >
                    &lt; {hours}h
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
