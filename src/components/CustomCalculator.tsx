import { useState, useMemo } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  type TransportMode,
  fareStructure,
  calculateFare,
  calculateMonthlyCost
} from "@/data/routes";
import { useLanguage } from "@/contexts/LanguageContext";

export function CustomCalculator() {
  const [distance, setDistance] = useState<string>("");
  const [tripsPerDay, setTripsPerDay] = useState<string>("2");
  const [daysPerMonth, setDaysPerMonth] = useState<string>("22");
  const [showResults, setShowResults] = useState(false);
  const { t } = useLanguage();

  const results = useMemo(() => {
    const km = parseFloat(distance) || 0;
    const trips = parseInt(tripsPerDay) || 2;
    const days = parseInt(daysPerMonth) || 22;

    if (km <= 0) return null;

    const allModes: TransportMode[] = ['mtc-ordinary', 'mtc-express', 'mtc-deluxe', 'metro', 'suburban', 'private'];

    return allModes.map(mode => {
      const structure = fareStructure[mode];
      const fare = calculateFare(mode, km);
      const monthly = calculateMonthlyCost(fare, trips, days);

      return {
        mode,
        name: structure.name,
        shortName: structure.shortName,
        color: structure.color,
        fare,
        monthly,
      };
    }).sort((a, b) => a.monthly - b.monthly);
  }, [distance, tripsPerDay, daysPerMonth]);

  const handleCalculate = () => {
    if (parseFloat(distance) > 0) {
      setShowResults(true);
    }
  };

  return (
    <section className="relative">
      <div className="">
        <div className="">
          <div className="text-center mb-4 md:mb-6 hidden md:block">
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-2">{t('calc.title')}</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              {t('calc.description')}
            </p>
          </div>

          <div className="bg-white/70 p-5 md:p-7 rounded-2xl shadow-lg border border-slate-200/80 backdrop-blur-sm">
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="distance" className="text-xs font-black text-slate-600 uppercase tracking-wider ml-0.5 flex items-center gap-2">
                  📏 {t('calc.distance')}
                </Label>
                <div className="relative group">
                  <Input
                    id="distance"
                    type="number"
                    placeholder="0.0"
                    value={distance}
                    onChange={(e) => {
                      setDistance(e.target.value);
                      setShowResults(false);
                    }}
                    className="h-12 rounded-xl border-slate-200/80 bg-white/60 focus:border-primary focus:bg-white text-base group-focus-within:border-primary group-focus-within:shadow-lg group-focus-within:shadow-primary/10 transition-all pl-4"
                    min="0"
                    step="0.1"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 group-focus-within:text-primary transition-colors">km</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="trips" className="text-xs font-black text-slate-600 uppercase tracking-wider ml-0.5 flex items-center gap-2">
                  🚌 {t('calc.trips')}
                </Label>
                <Input
                  id="trips"
                  type="number"
                  value={tripsPerDay}
                  onChange={(e) => {
                    setTripsPerDay(e.target.value);
                    setShowResults(false);
                  }}
                  className="h-12 rounded-xl border-slate-200/80 bg-white/60 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/10 text-base transition-all"
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <Label htmlFor="days" className="text-xs font-black text-slate-600 uppercase tracking-wider ml-0.5 flex items-center gap-2">
                📅 {t('calc.days')}
              </Label>
              <Input
                id="days"
                type="number"
                value={daysPerMonth}
                onChange={(e) => {
                  setDaysPerMonth(e.target.value);
                  setShowResults(false);
                }}
                className="h-12 rounded-xl border-slate-200/80 bg-white/60 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/10 text-base transition-all"
                min="1"
                max="31"
              />
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleCalculate}
                disabled={!distance || parseFloat(distance) <= 0}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/85 text-white hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 font-black uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className="w-5 h-5 mr-2" />
                {t('calc.calculate')}
              </Button>
            </motion.div>

            <AnimatePresence>
              {showResults && results && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-10 pt-10 border-t border-slate-100 overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp size={20} className="text-primary" />
                    </div>
                    <h3 className="font-black text-slate-900 text-lg">{t('calc.monthlyCost')} 💰</h3>
                  </div>

                  <div className="space-y-3">
                    {results.map((result, index) => {
                      const cheapest = index === 0;
                      const savingsVsExpensive = results[results.length - 1].monthly - result.monthly;

                      return (
                        <motion.div
                          key={result.mode}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.01, y: -2 }}
                          className={cn(
                            "flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-default group hover:shadow-md hover:bg-white/80 dark:hover:bg-slate-700/80",
                            cheapest
                              ? "bg-white/70 dark:bg-slate-800/70 border-emerald-400/60 dark:border-emerald-500/60"
                              : "bg-white/60 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-600/60 hover:border-primary/20 dark:hover:border-primary/30"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <motion.div
                              className={cn("w-3 h-3 rounded-full shadow-md", result.color)}
                              whileHover={{ scale: 1.3 }}
                            />
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{result.name}</p>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400">
                                ₹{result.fare} / {t('calc.perTrip')}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <motion.p
                              whileHover={{ scale: 1.05 }}
                              className="text-2xl font-black tracking-tight text-slate-900 dark:text-white"
                            >
                              ₹{result.monthly.toLocaleString()}
                            </motion.p>
                            {cheapest && savingsVsExpensive > 0 && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-wider mt-1 flex items-center justify-end gap-1"
                              >
                                <span>⭐</span>
                                {t('calc.saveAmount', { val: savingsVsExpensive.toLocaleString() })}
                              </motion.p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
