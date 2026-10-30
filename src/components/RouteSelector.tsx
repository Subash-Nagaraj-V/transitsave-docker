import { useState, useMemo } from "react";
import { MapPin, GraduationCap, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { allRoutes, type Route } from "@/data/routes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { RouteSearch } from "@/components/RouteSearch";
import { useRecentRoutes } from "@/hooks/useRecentRoutes";

interface RouteSelectorProps {
  onRouteSelect: (route: Route | null) => void;
  onStudentToggle: (isStudent: boolean) => void;
  selectedRoute: Route | null;
  isStudent: boolean;
}

export function RouteSelector({
  onRouteSelect,
  onStudentToggle,
  selectedRoute,
  isStudent
}: RouteSelectorProps) {
  const [selectedCity, setSelectedCity] = useState<'all' | 'chennai' | 'trichy'>('all');
  const { t } = useLanguage();
  const { recentRoutes, addRecentRoute, clearRecentRoutes } = useRecentRoutes();

  const filteredRoutes = useMemo(() => {
    if (selectedCity === 'all') return allRoutes;
    return allRoutes.filter(route => route.city === selectedCity);
  }, [selectedCity]);

  const handleCityChange = (value: string) => {
    setSelectedCity(value as 'all' | 'chennai' | 'trichy');
    onRouteSelect(null);
  };

  const handleRouteChange = (routeId: string) => {
    const route = allRoutes.find(r => r.id === routeId) || null;
    if (route) {
      addRecentRoute(route.id);
    }
    onRouteSelect(route);
  };

  const handleSearchSelect = (route: Route) => {
    addRecentRoute(route.id);
    onRouteSelect(route);
  };

  return (
    <section className="relative">
      <div className="overflow-visible">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl lg:text-2xl font-black text-slate-900 dark:text-white mb-1.5 md:mb-2 tracking-tight">
              {t('route.title')}
            </h2>
            <div className="h-1 md:h-1.5 w-20 md:w-32 bg-gradient-to-r from-primary to-accent rounded-full mx-auto shadow-lg shadow-primary/20" />
          </div>

          <div className="p-4 md:p-6 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-slate-700 shadow-lg dark:shadow-slate-900/30 backdrop-blur-lg relative overflow-hidden hover:shadow-md dark:hover:shadow-slate-900/50 transition-all">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-40 md:w-80 h-40 md:h-80 bg-primary/5 rounded-full blur-3xl -mr-20 md:-mr-40 -mt-20 md:-mt-40" />

            {/* Search Bar */}
            <div className="mb-6 md:mb-10 relative z-10">
              <Label className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2 md:mb-3.5 block">
                📍 {t('search.title')}
              </Label>
              <div className="group relative">
                <RouteSearch
                  onRouteSelect={handleSearchSelect}
                  recentRouteIds={recentRoutes}
                />
              </div>

              {recentRoutes.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 md:mt-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={clearRecentRoutes}
                  >
                    <Trash2 className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
                    {t('search.clearRecent')}
                  </Button>
                </motion.div>
              )}
            </div>

            <div className="relative mb-6 md:mb-10">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
                <span className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full text-slate-400 dark:text-slate-500">
                  {t('route.orBrowse')}
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:gap-8 md:grid-cols-2 mb-6 md:mb-10 relative z-10">
              {/* City Selector */}
              <div className="space-y-2 md:space-y-3">
                <Label htmlFor="city" className="text-[9px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 text-slate-600 dark:text-slate-400 ml-0.5">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                  {t('route.city')}
                </Label>
                <Select value={selectedCity} onValueChange={handleCityChange}>
                  <SelectTrigger id="city" className="h-10 md:h-14 rounded-lg md:rounded-2xl bg-white/60 dark:bg-slate-700/60 border-slate-200/80 dark:border-slate-600 focus:ring-primary/30 focus:border-primary focus:bg-white dark:focus:bg-slate-700 text-base font-bold shadow-md backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-700 transition-all text-sm md:text-base">
                    <SelectValue placeholder={t('route.city')} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl md:rounded-2xl border-white/80 dark:border-slate-700 shadow-xl">
                    <SelectItem value="all" className="rounded-lg md:rounded-xl focus:bg-primary/10">🌐 {t('route.allCities')}</SelectItem>
                    <SelectItem value="chennai" className="rounded-lg md:rounded-xl focus:bg-primary/10">🏙️ {t('route.chennai')}</SelectItem>
                    <SelectItem value="trichy" className="rounded-lg md:rounded-xl focus:bg-primary/10">🏛️ {t('route.trichy')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Route Selector */}
              <div className="space-y-2 md:space-y-3">
                <Label htmlFor="route" className="text-[9px] md:text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 ml-0.5">
                  🛣️ {t('route.route')}
                </Label>
                <Select
                  value={selectedRoute?.id || ""}
                  onValueChange={handleRouteChange}
                >
                  <SelectTrigger id="route" className="h-10 md:h-14 rounded-lg md:rounded-2xl bg-white/60 dark:bg-slate-700/60 border-slate-200/80 dark:border-slate-600 focus:ring-primary/30 focus:border-primary focus:bg-white dark:focus:bg-slate-700 text-base font-bold shadow-md backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-700 transition-all text-sm md:text-base">
                    <SelectValue placeholder={t('route.selectRoute')} />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 md:max-h-64 rounded-xl md:rounded-2xl border-white/80 dark:border-slate-700 shadow-xl">
                    {filteredRoutes.map((route) => (
                      <SelectItem key={route.id} value={route.id} className="rounded-lg md:rounded-xl focus:bg-primary/10">
                        <span className="flex items-center gap-2 md:gap-3">
                          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm md:text-base">{route.name}</span>
                          <span className="text-[8px] md:text-[10px] font-black text-white bg-primary px-2 md:px-2.5 py-0.5 md:py-1 rounded-full shadow-md uppercase tracking-tighter">
                            {route.distance} km
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Student Pass Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-6 lg:p-8 rounded-lg md:rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 border border-primary/20 dark:border-primary/30 shadow-lg group transition-all hover:border-primary/40 hover:shadow-primary/20 dark:hover:border-primary/50">
              <div className="flex items-center gap-3 md:gap-5 flex-1">
                <div className="p-2 md:p-4 rounded-lg md:rounded-2xl bg-white dark:bg-slate-700 shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all">
                  <GraduationCap className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <Label htmlFor="student-pass" className="text-base md:text-lg font-black text-slate-900 dark:text-white cursor-pointer block mb-0.5 md:mb-1">
                    🎓 {t('route.studentPass')}
                  </Label>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    {t('route.studentDiscount')}
                  </p>
                </div>
              </div>
              <Switch
                id="student-pass"
                checked={isStudent}
                onCheckedChange={onStudentToggle}
                className="data-[state=checked]:bg-primary scale-100 sm:scale-125 flex-shrink-0"
                aria-label="Toggle student pass discount"
              />
            </div>

            {/* Selected Route Info */}
            {selectedRoute && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 md:mt-10 p-4 md:p-6 lg:p-10 rounded-lg md:rounded-2xl bg-gradient-to-br from-primary to-primary/85 dark:from-primary/80 dark:to-primary/60 text-white shadow-2xl shadow-primary/30 relative overflow-hidden group"
              >
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 flex items-center justify-between flex-col sm:flex-row gap-4 md:gap-6">
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-[8px] md:text-xs font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-white/70 mb-2">{t('route.selected')}</p>
                    <p className="text-lg md:text-2xl lg:text-3xl font-black leading-tight">
                      {selectedRoute.from} <span className="text-white/40 mx-1 md:mx-2">→</span> {selectedRoute.to}
                    </p>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-[8px] md:text-xs font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-white/70 mb-1 md:mb-2">{t('route.distance')}</p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-black leading-none tracking-tighter">{selectedRoute.distance} <span className="text-base md:text-lg opacity-60">km</span></p>
                  </div>
                </div>
              </motion.div>
            )}

            {!selectedRoute && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[8px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-300 dark:text-slate-600 mt-6 md:mt-10"
              >
                👆 {t('route.selectPrompt')}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
