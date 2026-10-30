import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, TrainFront, Check, Clock, Smartphone, Users, Heart, Map as MapIcon, Plus, Minus, AlertCircle } from "lucide-react";
import {
  type Route,
  type TransportMode,
  fareStructure,
  calculateFare,
  estimateTravelTime
} from "@/data/routes";
import { getMetroRoute } from "@/data/metroData";
import { transportImages, transportImageAlt } from "@/data/transportImages";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShareButton } from "@/components/ShareButton";
import { ConductorCard } from "@/components/ConductorCard";
import { WeatherComfortPill } from "@/components/WeatherComfortPill";
import { TransitMapModal } from "@/components/TransitMapModal";
import { ProximityAlert } from "@/components/ProximityAlert";

interface FareComparisonProps {
  route: Route | null;
  isStudent: boolean;
}

interface FareResult {
  mode: TransportMode;
  fare: number;
  totalFare: number;
  name: string;
  shortName: string;
  color: string;
  available: boolean;
  travelTime: number;
  error?: string;
}

export function FareComparison({ route, isStudent }: FareComparisonProps) {
  const { t } = useLanguage();
  const [activeConductorCard, setActiveConductorCard] = useState<{ destination: string; fare: number } | null>(null);
  const [groupSize, setGroupSize] = useState(1);
  const [isWomenFree, setIsWomenFree] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const fares = useMemo<FareResult[]>(() => {
    if (!route) return [];

    const allModes: TransportMode[] = ['mtc-ordinary', 'mtc-express', 'mtc-deluxe', 'metro', 'suburban', 'private'];

    return allModes.map(mode => {
      const structure = fareStructure[mode];
      const available = route.availableModes.includes(mode);
      let error: string | undefined = undefined;

      // Special logic for Metro to check official data and fetch error
      if (mode === 'metro') {
        const metroData = getMetroRoute(route.from, route.to);
        if (metroData?.error) {
          error = metroData.error;
        }
      }

      // Calculate base fare without any discount
      let baseFare = available ? calculateFare(mode, route.distance, false) : 0;

      // Student Pass: 100% FREE on MTC Ordinary only
      if (available && isStudent && mode === 'mtc-ordinary') {
        baseFare = 0;
      }

      // Pink Bus Logic (Free for Women on Ordinary MTC)
      if (available && isWomenFree && mode === 'mtc-ordinary') {
        baseFare = 0;
      }

      const travelTime = available ? estimateTravelTime(mode, route.distance) : 0;

      return {
        mode,
        fare: baseFare,
        totalFare: baseFare * groupSize,
        name: structure.name,
        shortName: structure.shortName,
        color: structure.color,
        available,
        travelTime,
        error
      };
    }).sort((a, b) => {
      // Put errors grouped with unavailable options at bottom
      if (a.error && !b.error) return 1;
      if (!a.error && b.error) return -1;

      if (!a.available && !a.error) return 1;
      if (!b.available && !b.error) return -1;

      return a.fare - b.fare;
    });
  }, [route, isStudent, groupSize, isWomenFree]);

  const cheapestMode = useMemo(() => {
    const available = fares.filter(f => f.available && !f.error);
    if (available.length === 0) return 'mtc-ordinary' as TransportMode;
    return available.reduce((min, f) => f.fare < min.fare ? f : min).mode;
  }, [fares]);

  if (!route) return null;

  return (
    <section className="relative" aria-label="Fare comparison">
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Controls Bar */}
          <div className="mb-6 md:mb-8 lg:mb-12 flex flex-col md:flex-row gap-3 md:gap-4 lg:gap-6 items-start md:items-center justify-between bg-white/70 dark:bg-slate-800/70 p-4 md:p-6 lg:p-8 rounded-lg md:rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700 backdrop-blur-sm overflow-x-auto">
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 md:gap-4 lg:gap-6 md:gap-8 lg:gap-10 w-full">
              {/* Group Size */}
              <div className="flex flex-col gap-1.5 md:gap-2">
                <span className="text-[8px] md:text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">👥 {t('local.group.label')}</span>
                <div className="flex items-center bg-gradient-to-r from-slate-100 dark:from-slate-700 to-slate-50 dark:to-slate-800 rounded-lg md:rounded-xl p-1.5 shadow-inner border border-slate-200/50 dark:border-slate-600">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                    className="p-1.5 md:p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all active:bg-slate-200 dark:active:bg-slate-600"
                    aria-label="Decrease group size"
                    aria-describedby="group-size-display"
                  >
                    <Minus size={16} className="md:size-[18px] text-slate-500 dark:text-slate-400" />
                  </motion.button>
                  <motion.span
                    key={groupSize}
                    id="group-size-display"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-8 md:w-12 text-center font-black text-base md:text-lg tabular-nums text-slate-900 dark:text-white"
                    role="status"
                    aria-live="polite"
                  >
                    {groupSize}
                  </motion.span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGroupSize(Math.min(10, groupSize + 1))}
                    className="p-1.5 md:p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all active:bg-slate-200 dark:active:bg-slate-600"
                    aria-label="Increase group size"
                  >
                    <Plus size={16} className="md:size-[18px] text-slate-500 dark:text-slate-400" />
                  </motion.button>
                </div>
              </div>

              {/* Women Free Scheme */}
              <div className="flex flex-col gap-1.5 md:gap-2">
                <span className="text-[8px] md:text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">🎁 {t('fare.scheme')}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWomenFree(!isWomenFree)}
                  className={`flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-black transition-all ${isWomenFree
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
                    }`}
                  aria-pressed={isWomenFree}
                  aria-label="Toggle women free scheme"
                >
                  <motion.div
                    animate={isWomenFree ? { rotate: 360 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Heart size={14} className="md:size-4" />
                  </motion.div>
                  <span className="hidden sm:inline">{t('fare.womenFree')}</span>
                </motion.button>
              </div>

              {/* Map Button */}
              <div className="flex flex-col gap-1.5 md:gap-2">
                <span className="text-[8px] md:text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">🗺️ {t('fare.map')}</span>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMapOpen(true)}
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-black bg-gradient-to-r from-slate-900 dark:from-slate-700 to-slate-800 dark:to-slate-600 text-white hover:shadow-lg hover:shadow-slate-900/30 dark:hover:shadow-slate-900/50 active:shadow-xl transition-all"
                  aria-label="View transit map"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                  >
                    <MapIcon size={14} className="md:size-4" />
                  </motion.div>
                  <span className="hidden sm:inline">{t('fare.viewMap')}</span>
                </motion.button>
              </div>
            </div>

            <div className="md:hidden">
              <ShareButton
                route={route}
                isStudent={isStudent}
                cheapestMode={cheapestMode}
                cheapestFare={fares.find(f => f.mode === cheapestMode)?.fare || 0}
              />
            </div>

            <div className="hidden md:block">
              <ShareButton
                route={route}
                isStudent={isStudent}
                cheapestMode={cheapestMode}
                cheapestFare={fares.find(f => f.mode === cheapestMode)?.fare || 0}
              />
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid gap-3 md:gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3" role="region" aria-label="Available transit modes">
            <AnimatePresence mode="popLayout">
              {fares.map((result) => (
                <FareCard
                  key={result.mode}
                  result={result}
                  groupSize={groupSize}
                  isCheapest={result.mode === cheapestMode}
                  onSelectConductor={() => setActiveConductorCard({ destination: route.to, fare: result.fare })}
                  t={t}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <TransitMapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />

      <ConductorCard
        isOpen={!!activeConductorCard}
        onClose={() => setActiveConductorCard(null)}
        destination={activeConductorCard?.destination || ""}
        fare={activeConductorCard?.fare || 0}
      />
    </section>
  );
}

interface FareCardProps {
  result: FareResult;
  groupSize: number;
  isCheapest: boolean;
  onSelectConductor: () => void;
  t: any;
}

function FareCard({ result, groupSize, isCheapest, onSelectConductor, t }: FareCardProps) {
  if (result.error) {
    return (
      <div className="p-8 rounded-2xl bg-red-50/50 dark:bg-red-900/10 border border-dashed border-red-200 dark:border-red-900/50 flex flex-col items-center text-center min-h-[384px]">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
          <AlertCircle className="text-red-500 dark:text-red-400" size={24} />
        </div>
        <span className="text-sm font-black text-slate-700 dark:text-slate-300 mb-3">{result.name}</span>
        <p className="text-xs text-red-600 dark:text-red-400 font-medium leading-relaxed max-w-[200px]">
          {result.error}
        </p>
      </div>
    );
  }

  if (!result.available) {
    return (
      <div className="p-8 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-600 opacity-50 grayscale flex flex-col items-center justify-center text-center min-h-[384px]">
        <span className="text-sm font-black text-slate-400 dark:text-slate-500 mb-2">{result.name}</span>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">✗ {t('fare.serviceNotAvailable')}</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className={cn(
        "p-6 md:p-7 rounded-2xl bg-white/80 dark:bg-slate-800/90 border-2 transition-all shadow-md hover:shadow-lg flex flex-col gap-5 backdrop-blur-sm hover:border-primary/30 dark:hover:border-primary/40",
        isCheapest ? "border-emerald-400/60 dark:border-emerald-500/60" : "border-slate-200/80 dark:border-slate-600/80"
      )}
    >
      {/* Transport Image */}
      <div className="relative h-32 md:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200/50 flex items-center justify-center">
        <img
          src={transportImages[result.mode]}
          alt={transportImageAlt[result.mode] || result.name}
          className="w-full h-full object-cover object-center scale-110"
          style={{
            filter: 'contrast(1.1) brightness(1.05)',
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("p-3 rounded-xl text-white shadow-lg", result.color)}>
            {result.mode.includes('bus') || result.mode.includes('mtc') ? <Bus size={22} /> : <TrainFront size={22} />}
          </div>
          <div>
            <h3 className="font-black text-slate-900 dark:text-white leading-tight text-lg">{result.name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock size={13} className="text-slate-400 dark:text-slate-500" />
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{result.travelTime} {t('fare.mins')}</span>
            </div>
          </div>
        </div>
        {isCheapest && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-md dark:shadow-emerald-900/30">
            <Check size={12} />
            {t('fare.bestPrice')}
          </div>
        )}
      </div>

      <div className="flex flex-col bg-white/50 dark:bg-slate-700/50 rounded-xl p-4 border-2 border-slate-100 dark:border-slate-600">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">₹{result.totalFare}</span>
          {result.fare === 0 && <span className="text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50">{t('fare.free')}</span>}
        </div>
        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-3">
          {groupSize > 1 ? `₹${result.fare} × ${groupSize} ${t('fare.passengers')}` : t('fare.perTrip')}
        </span>
      </div>

      <div className="flex flex-col gap-3 pt-3 border-t-2 border-slate-100 dark:border-slate-600 mt-auto">
        <WeatherComfortPill mode={result.mode} />

        <div className="flex flex-col gap-2">
          <ProximityAlert travelTime={result.travelTime} />

          {(result.mode.includes('mtc') || result.mode.includes('suburban')) && (
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectConductor();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-slate-900 dark:from-slate-700 to-slate-800 dark:to-slate-600 text-white hover:shadow-lg hover:shadow-slate-900/30 dark:hover:shadow-slate-900/50 transition-all font-black uppercase tracking-wider text-[10px] group active:shadow-inner border-2 border-slate-700 dark:border-slate-500"
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                className="flex items-center"
              >
                <Smartphone size={15} />
              </motion.div>
              {t('fare.showConductor')}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
