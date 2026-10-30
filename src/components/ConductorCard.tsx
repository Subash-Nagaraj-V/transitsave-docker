import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Ticket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ConductorCardProps {
    isOpen: boolean;
    onClose: () => void;
    destination: string;
    fare: number;
}

export function ConductorCard({ isOpen, onClose, destination, fare }: ConductorCardProps) {
    const { t } = useLanguage();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                    <Smartphone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 leading-none mb-1">{t('tourist.conductor.title')}</h3>
                                    <div className="h-1 w-8 bg-primary rounded-full" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    {t('tourist.conductor.request')}
                                </p>

                                <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
                                    <h4 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{destination}</h4>
                                </div>

                                <div className="flex items-center gap-4 py-4 border-t border-b border-slate-100">
                                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                        <Ticket size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-slate-400 text-sm font-bold">₹</span>
                                            <span className="text-3xl font-black text-slate-900">{fare}</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ESTIMATED FARE</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2 text-center pt-4">
                                    <div className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                        Digital Interaction Aid
                                    </div>
                                    <p className="text-xs text-slate-500 italic">
                                        "Please show this screen to the conductor or counter staff"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
