import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Download, Map as MapIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TransitMapModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TransitMapModal({ isOpen, onClose }: TransitMapModalProps) {
    const { t } = useLanguage();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 backdrop-blur-2xl bg-slate-950/80"
                >
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />

                    <motion.div
                        initial={{ scale: 0.9, y: 50, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 50, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-6xl h-full bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col shadow-[0_0_100px_-20px_rgba(37,99,235,0.3)] border border-white/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-8 md:p-10 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
                            <div className="flex items-center gap-6">
                                <div className="p-4 rounded-2xl bg-primary/20 text-primary shadow-2xl shadow-primary/20">
                                    <MapIcon size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1">
                                        {t('local.map.title')}
                                    </h2>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        {t('local.map.desc')}
                                    </p>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="p-4 rounded-2xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={24} />
                            </motion.button>
                        </div>

                        {/* Map Container */}
                        <div className="flex-1 overflow-auto bg-slate-950/50 flex items-center justify-center relative group">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="relative min-w-full min-h-full p-10 md:p-20 flex items-center justify-center"
                            >
                                {/* Digital Frame Overlay */}
                                <div className="absolute inset-0 border-[20px] md:border-[40px] border-slate-900/50 pointer-events-none z-10" />

                                <img
                                    src="/images/metro-map.jpg"
                                    alt="Chennai Transit Map"
                                    className="w-full h-auto max-w-full rounded-2xl shadow-2xl shadow-black/50 border border-white/5 transition-transform duration-700 hover:scale-[1.02] cursor-zoom-in"
                                />

                                {/* Scanning Lines Effect */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20" />
                            </motion.div>
                        </div>

                        {/* Footer / Status Bar */}
                        <div className="p-6 md:p-8 bg-slate-900/80 border-t border-white/5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">System Status: Active</span>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Offline Sync Cloud: Encrypted</span>
                                </div>

                                <motion.button
                                    whileHover={{ y: -2 }}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-primary/80 transition-colors"
                                >
                                    <Download size={14} />
                                    Save for Offline
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
