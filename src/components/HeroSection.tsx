import { Bus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const transportIcons = [
  { image: "/transport/bus.webp", labelKey: "transport.mtc", delay: 0, bgColor: "bg-orange-500/10", textColor: "text-orange-600 dark:text-orange-400", borderColor: "border-orange-500/30" },
  { image: "/transport/metro.avif", labelKey: "transport.metro", delay: 0.1, bgColor: "bg-blue-500/10", textColor: "text-blue-600 dark:text-blue-400", borderColor: "border-blue-500/30" },
  { image: "/transport/train.webp", labelKey: "transport.suburban", delay: 0.2, bgColor: "bg-green-500/10", textColor: "text-green-600 dark:text-green-400", borderColor: "border-green-500/30" },
  { image: "/transport/private.webp", labelKey: "transport.private", delay: 0.3, bgColor: "bg-violet-500/10", textColor: "text-violet-600 dark:text-violet-400", borderColor: "border-violet-500/30" },
];

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
};

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-5 md:py-8 bg-gradient-to-br from-white dark:from-slate-950 via-slate-50/50 dark:via-slate-900/50 to-slate-50 dark:to-slate-900">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-10 right-10 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/15 rounded-full blur-[80px] md:blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-20 -left-20 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-accent/10 rounded-full blur-[80px] md:blur-[100px]"
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-3 md:mb-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 dark:border-primary/30 text-primary dark:text-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] shadow-xl shadow-primary/5 hover:border-primary/40 hover:shadow-primary/10 transition-all"
          >
            <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
            ✨ {t('hero.badge')}
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-center mb-3 md:mb-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-2 md:mb-2 leading-[0.95] dark:text-white">
            <span className="text-slate-900 dark:text-white">{t('hero.title1')}</span>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="block bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent mt-2 md:mt-3 py-2 md:py-3"
            >
              {t('hero.title2')}
            </motion.span>
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-slate-500 dark:text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </motion.div>

        {/* Transport mode badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-4 md:mb-6 max-w-2xl mx-auto"
        >
          {transportIcons.map((item) => (
            <motion.div
              key={item.labelKey}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.08, y: -6 }}
              transition={{ duration: 0.4, delay: 0.3 + item.delay }}
              className={`flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2.5 md:py-3 rounded-full glass dark:glass-dark border-2 ${item.borderColor} shadow-lg shadow-slate-200/20 dark:shadow-slate-900/30 hover:border-primary/50 hover:shadow-primary/20 transition-all group cursor-default backdrop-blur-sm`}
            >
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden shadow-sm group-hover:rotate-6 group-hover:scale-110 transition-transform">
                <img src={item.image} alt={t(item.labelKey)} className="w-full h-full object-cover" />
              </div>
              <span className={`text-[9px] md:text-xs font-black uppercase tracking-widest ${item.textColor}`}>{t(item.labelKey)}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats - Compact Version */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 gap-2 md:gap-3 max-w-2xl mx-auto"
        >
          <StatCard
            title={t('stats.routes')}
            description={t('stats.routesDesc')}
            icon={<div className="p-1.5 rounded-lg bg-primary/10"><Bus className="w-4 h-4 text-primary" /></div>}
            delay={0.6}
          />
          <StatCard
            title={t('stats.student')}
            description={t('stats.studentDesc')}
            icon={<div className="p-1.5 rounded-lg bg-pink-100"><span className="text-sm md:text-base">🎓</span></div>}
            delay={0.7}
          />
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({
  title,
  description,
  icon,
  delay
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="p-2.5 md:p-4 rounded-lg md:rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-slate-700 shadow-lg shadow-slate-100/40 dark:shadow-slate-900/30 backdrop-blur-sm group cursor-default hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-all"
    >
      <div className="flex flex-col gap-1.5 md:gap-2">
        <div className="group-hover:scale-110 group-hover:rotate-6 transition-transform origin-left">
          {icon}
        </div>
        <div>
          <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white mb-0.5 leading-none">{title}</h3>
          <p className="text-[8px] md:text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
