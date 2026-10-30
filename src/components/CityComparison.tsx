import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, MapPin, TrendingDown, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  intercityRoutes,
  intercityModeInfo,
  cities,
  type City,
} from "@/data/intercityRoutes";
import { transportImages } from "@/data/transportImages";

export function CityComparison() {
  const [fromCity, setFromCity] = useState<City>("Chennai");
  const [toCity, setToCity] = useState<City>("Trichy");
  const { t } = useLanguage();

  const selectedRoute = useMemo(() => {
    return intercityRoutes.find(
      route => route.from === fromCity && route.to === toCity
    );
  }, [fromCity, toCity]);

  const cheapestMode = useMemo(() => {
    if (!selectedRoute) return null;
    return selectedRoute.modes.reduce((min, mode) =>
      mode.fare < min.fare ? mode : min
    );
  }, [selectedRoute]);

  const handleSwap = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const availableToCities = cities.filter(city => city !== fromCity);

  return (
    <section className="relative">
      <div className="">
        <div className="">
          <div className="text-center mb-4 md:mb-6 hidden md:block">
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-2">{t('intercity.title')}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              {t('intercity.description')}
            </p>
          </div>

          <Card className="mb-8 p-7 md:p-8 shadow-lg border-slate-200/80 rounded-2xl bg-white/70 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 w-full space-y-3">
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider ml-0.5 flex items-center gap-2">
                  📍 {t('intercity.from')}
                </label>
                <Select value={fromCity} onValueChange={(v) => setFromCity(v as City)}>
                  <SelectTrigger className="h-12 rounded-xl border-slate-200/80 bg-white/50 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {cities.map(city => (
                      <SelectItem key={city} value={city} disabled={city === toCity}>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-slate-400" />
                          <span className="font-medium">{city}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSwap}
                  className="rounded-full md:mt-6 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all hover:text-primary"
                >
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <RefreshCcw size={20} className="text-slate-500" />
                  </motion.div>
                </Button>
              </motion.div>

              <div className="flex-1 w-full space-y-3">
                <label className="text-xs font-black text-slate-600 uppercase tracking-wider ml-0.5 flex items-center gap-2">
                  📍 {t('intercity.to')}
                </label>
                <Select value={toCity} onValueChange={(v) => setToCity(v as City)}>
                  <SelectTrigger className="h-12 rounded-xl border-slate-200/80 bg-white/50 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {availableToCities.map(city => (
                      <SelectItem key={city} value={city}>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-slate-400" />
                          <span className="font-medium">{city}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedRoute && (
              <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <span className="text-slate-400">📏 Total Distance:</span>
                  <span className="text-lg text-slate-900">{selectedRoute.distance} KM</span>
                </div>
                <div className="flex items-center gap-3 text-lg font-black text-slate-900 uppercase">
                  {fromCity}
                  <ArrowRight size={20} className="text-primary" />
                  {toCity}
                </div>
              </div>
            )}
          </Card>

          <AnimatePresence mode="wait">
            {selectedRoute && (
              <motion.div
                key={selectedRoute.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-5 md:grid-cols-3"
              >
                {selectedRoute.modes.map((modeData) => {
                  const modeInfo = intercityModeInfo[modeData.mode];
                  const isCheapest = cheapestMode?.mode === modeData.mode;
                  
                  // Map intercity modes to available transport images
                  const modeImageMap: Record<string, string> = {
                    'government-bus': transportImages['mtc-ordinary'],
                    'private-bus': transportImages['private'],
                  };
                  const imageUrl = modeImageMap[modeData.mode];

                  return (
                    <Card key={modeData.mode} className={cn(
                      "transition-all shadow-md rounded-2xl hover:shadow-lg hover:-translate-y-2 overflow-hidden flex flex-col border-2 bg-white/70 dark:bg-slate-800/70",
                      isCheapest ? "border-emerald-400/60 dark:border-emerald-500/60" : "border-slate-200/60 dark:border-slate-600/60 hover:border-primary/30 dark:hover:border-primary/40"
                    )}>
                      {imageUrl && (
                        <div className="relative h-24 md:h-32 bg-gradient-to-br from-slate-100 dark:from-slate-700 to-slate-50 dark:to-slate-800 border-b border-slate-200 dark:border-slate-600">
                          <img 
                            src={imageUrl} 
                            alt={modeInfo.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-3xl">{modeInfo.icon}</span>
                          {isCheapest && (
                            <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-md">
                              ⭐ {t('fare.cheapest')}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg text-slate-900 dark:text-white">{t(modeInfo.nameKey)}</CardTitle>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                          {modeData.frequency}
                        </span>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex flex-col gap-4">
                          <div>
                            <span className="text-4xl font-black text-slate-900 dark:text-white">₹{modeData.fare}</span>
                            <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">{t('fare.perTrip')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg border border-slate-200 dark:border-slate-600">
                            <Clock size={16} className="text-primary" />
                            <span>{modeData.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {selectedRoute && cheapestMode && (
            <div className="mt-10 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 dark:from-slate-800 to-slate-800 dark:to-slate-700 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl border border-slate-700 dark:border-slate-600">
              <div className="bg-white/10 dark:bg-white/5 p-4 rounded-xl backdrop-blur-sm">
                <TrendingDown size={28} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-sm md:text-base font-medium leading-relaxed">
                  {t('intercity.tipText')} <span className="font-black text-emerald-400 text-lg">{t(intercityModeInfo[cheapestMode.mode].nameKey)}</span> {t('intercity.tipSave')}
                  <span className="text-2xl font-black mx-2 text-emerald-400">₹{Math.max(...selectedRoute.modes.map(m => m.fare)) - cheapestMode.fare}</span>
                  {t('intercity.perTrip')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}