import { motion } from "framer-motion";
import { MapPin, Navigation, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  type: "station" | "stop";
}

interface TransitMapProps {
  routeName?: string;
  stations?: Station[];
  onStationSelect?: (station: Station) => void;
}

export function TransitMap({
  routeName = "Route Overview",
  stations = [
    { id: "1", name: "Central Station", x: 20, y: 50, type: "station" },
    { id: "2", name: "Market Stop", x: 40, y: 30, type: "stop" },
    { id: "3", name: "Temple Junction", x: 60, y: 50, type: "stop" },
    { id: "4", name: "Airport Terminal", x: 80, y: 70, type: "station" },
  ],
  onStationSelect,
}: TransitMapProps) {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const { t } = useLanguage();

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    onStationSelect?.(station);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg">
      {/* Map Header */}
      <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary text-white">
              <Navigation size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg">{routeName}</h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                {stations.length} stations
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 rounded-lg text-xs md:text-sm"
          >
            <Zap size={16} />
            <span className="hidden sm:inline">Real-time</span>
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[300px] md:h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Route line */}
          <motion.polyline
            points={stations.map((s) => `${s.x},${s.y}`).join(" ")}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Station circles */}
          <motion.g variants={containerVariants} initial="hidden" animate="visible">
            {stations.map((station, index) => (
              <motion.g
                key={station.id}
                variants={itemVariants}
                onClick={() => handleStationClick(station)}
                className="cursor-pointer"
              >
                {/* Pulse background */}
                <motion.circle
                  cx={station.x}
                  cy={station.y}
                  r="3"
                  fill="#3b82f6"
                  opacity="0.2"
                  animate={{
                    r: [3, 5, 3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                />

                {/* Main station circle */}
                <motion.circle
                  cx={station.x}
                  cy={station.y}
                  r="2"
                  fill={selectedStation?.id === station.id ? "#10b981" : "#3b82f6"}
                  whileHover={{ r: 2.5 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.g>
            ))}
          </motion.g>
        </svg>

        {/* Info popup */}
        {selectedStation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6 p-3 md:p-4 rounded-xl bg-white dark:bg-slate-700 shadow-lg border border-slate-200 dark:border-slate-600"
          >
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm md:text-base truncate">
                  {selectedStation.name}
                </h4>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  {selectedStation.type === "station"
                    ? "Major Station"
                    : "Stop"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Stations List */}
      <div className="p-4 md:p-6 border-t border-slate-200 dark:border-slate-700">
        <h4 className="font-bold text-sm mb-3 md:mb-4">All Stations</h4>
        <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto">
          {stations.map((station, index) => (
            <motion.button
              key={station.id}
              onClick={() => handleStationClick(station)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-2 md:p-3 rounded-lg text-left transition-all text-sm md:text-base ${
                selectedStation?.id === station.id
                  ? "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
                  : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-150 dark:hover:bg-slate-600"
              }`}
              aria-pressed={selectedStation?.id === station.id}
              aria-label={`${station.name} - ${station.type}`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    station.type === "station"
                      ? "bg-blue-600"
                      : "bg-slate-400"
                  }`}
                />
                <span className="font-medium truncate">{station.name}</span>
                {station.type === "station" && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full flex-shrink-0 ml-auto">
                    Hub
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
