import { motion } from "framer-motion";
import { CloudRain, Sun, ThermometerSun, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { type TransportMode } from "@/data/routes";
import { cn } from "@/lib/utils";

interface WeatherComfortPillProps {
    mode: TransportMode;
}

export function WeatherComfortPill({ mode }: WeatherComfortPillProps) {
    const { t } = useLanguage();

    const getComfort = () => {
        const hour = new Date().getHours();
        const isHot = hour >= 10 && hour <= 16;
        const isRaining = false;

        if (isHot) {
            if (mode === 'metro' || mode === 'mtc-deluxe') {
                return {
                    label: t('tourist.weather.comfort'),
                    icon: ThermometerSun,
                    color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
                    glow: "shadow-amber-500/10",
                    desc: t('tourist.weather.hot')
                };
            }
        }

        if (isRaining) {
            if (mode === 'metro' || mode === 'suburban') {
                return {
                    label: t('tourist.weather.comfort'),
                    icon: CloudRain,
                    color: "text-blue-400 border-blue-500/20 bg-blue-500/5",
                    glow: "shadow-blue-500/10",
                    desc: t('tourist.weather.rain')
                };
            }
        }

        return null;
    };

    const comfort = getComfort();
    if (!comfort) return null;

    const Icon = comfort.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -2, scale: 1.05 }}
            className={cn(
                "group relative flex items-center gap-2.5 px-4 py-1.5 rounded-full border glass backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] shadow-xl transition-all duration-300",
                comfort.color,
                comfort.glow
            )}
        >
            <div className="relative">
                <Icon size={14} className="relative z-10" />
                <div className="absolute inset-0 blur-sm bg-current opacity-40 animate-pulse" />
            </div>

            <span>{comfort.label}</span>

            {/* Premium Tooltip */}
            <div className="absolute invisible group-hover:visible group-active:visible top-full left-1/2 -translate-x-1/2 mt-4 p-4 glass-dark border-white/10 text-white/80 text-[10px] font-bold rounded-2xl w-56 z-50 shadow-2xl backdrop-blur-xl transition-all">
                <div className="flex flex-col gap-2">
                    <span className="text-primary font-black uppercase tracking-widest text-[9px]">Local Advisory</span>
                    <p className="leading-relaxed tracking-wide">{comfort.desc}</p>
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-t border-l border-white/10 rotate-45" />
            </div>
        </motion.div>
    );
}
