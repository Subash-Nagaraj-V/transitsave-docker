import { useState, useEffect } from "react";
import { Bell, BellRing, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProximityAlertProps {
    travelTime: number;
}

export function ProximityAlert({ travelTime }: ProximityAlertProps) {
    const { t } = useLanguage();
    const [isActive, setIsActive] = useState(false);
    const [isTriggered, setIsTriggered] = useState(false);

    const toggleAlert = () => {
        if (isActive) {
            setIsActive(false);
            return;
        }

        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        setIsActive(true);
        toast.success("Haptic Radar Initialized", {
            description: "You'll be notified 5 minutes before arrival.",
            className: "glass border-primary/20",
        });
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isActive) {
            const demoDelay = travelTime > 0 ? 10000 : 5000;

            timer = setTimeout(() => {
                setIsTriggered(true);
                setIsActive(false);

                if ("vibrate" in navigator) {
                    navigator.vibrate([300, 100, 300, 100, 300]);
                }

                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification(t('tourist.alert.title'), {
                        body: t('tourist.alert.msg'),
                        icon: "/favicon.ico"
                    });
                }

                toast.message("Arrival Proximity Alert", {
                    description: "Time to prepare for your deboarding soon.",
                    duration: 10000,
                    icon: <BellRing className="text-primary animate-bounce" />,
                    className: "glass-dark border-primary/40 text-white",
                });
            }, demoDelay);
        }

        return () => clearTimeout(timer);
    }, [isActive, travelTime, t]);

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
                e.stopPropagation();
                toggleAlert();
            }}
            className={cn(
                "group relative flex items-center gap-2.5 px-4 py-1.5 rounded-full border transition-all duration-500 overflow-hidden",
                isActive
                    ? "glass-dark border-primary/50 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                    : "glass border-slate-200/50 text-slate-500 hover:text-primary hover:border-primary/30 shadow-xl shadow-slate-200/5"
            )}
        >
            <div className="relative z-10">
                {isActive ? (
                    <motion.div
                        animate={{ rotate: [-20, 20, -20] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <BellRing size={14} className="text-primary" />
                    </motion.div>
                ) : (
                    <Bell size={14} className="group-hover:rotate-12 transition-transform" />
                )}
            </div>

            <span className="text-[10px] font-black uppercase tracking-[0.2em] relative z-10">
                {isActive ? "Radar Tracking" : "Dest. Alert"}
            </span>

            {/* Radar Animation Overlay */}
            <AnimatePresence>
                {isActive && (
                    <>
                        <motion.div
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{ scale: 3, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                            className="absolute top-1/2 left-4 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/40 z-0"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent z-0"
                        />
                    </>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
