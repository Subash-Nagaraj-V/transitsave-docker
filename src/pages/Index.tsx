import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { RouteSelector } from "@/components/RouteSelector";
import { FareComparison } from "@/components/FareComparison";
import { CityComparison } from "@/components/CityComparison";
import { CustomCalculator } from "@/components/CustomCalculator";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Route } from "@/data/routes";
import { motion } from "framer-motion";
import { ArrowRight, IndianRupee, MapPin, CalculatorIcon } from "lucide-react";

type ActiveFeature = "route" | "calculator" | "city" | null;

const Index = () => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isStudent, setIsStudent] = useState(false);
  const [activeFeature, setActiveFeature] = useState<ActiveFeature>(null);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-primary/20 flex flex-col">
      <Header />

      <HeroSection />

      {/* Feature Selection - Big Easy-to-Use Cards */}
      {!activeFeature ? (
        <section className="flex-1 py-8 md:py-16 px-4 md:px-6 bg-gradient-to-b from-slate-50/50 dark:from-slate-900/50 to-white dark:to-slate-950">
          <div className="container mx-auto max-w-5xl">
            {/* Instruction Text */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10 md:mb-14"
            >
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
                {t('index.whatTodo')}
              </h2>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">
                {t('index.chooseOption')}
              </p>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Card 1: Compare Routes */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setActiveFeature("route")}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700/50 p-6 md:p-8 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all text-left h-full"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl -mr-12 -mt-12" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-blue-500 text-white shadow-lg">
                      <IndianRupee className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-2 transition-transform" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-2">
                    {t('index.compareFares')}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('index.compareFaresDesc')}
                  </p>
                </div>
              </motion.button>

              {/* Card 2: Distance Calculator */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setActiveFeature("calculator")}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border-2 border-green-200 dark:border-green-700/50 p-6 md:p-8 shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all text-left h-full"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-3xl -mr-12 -mt-12" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-green-500 text-white shadow-lg">
                      <CalculatorIcon className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-500 group-hover:translate-x-2 transition-transform" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-2">
                    {t('index.calcMonthly')}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('index.calcMonthlyDesc')}
                  </p>
                </div>
              </motion.button>

              {/* Card 3: Inter-City Routes */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setActiveFeature("city")}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border-2 border-purple-200 dark:border-purple-700/50 p-6 md:p-8 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all text-left h-full"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl -mr-12 -mt-12" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-purple-500 text-white shadow-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-purple-500 group-hover:translate-x-2 transition-transform" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-2">
                    {t('index.cityRoutes')}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('index.cityRoutesDesc')}
                  </p>
                </div>
              </motion.button>
            </div>
          </div>
        </section>
      ) : (
        /* Active Feature View */
        <section className="flex-1 py-6 md:py-10 px-4 md:px-6 bg-gradient-to-b from-slate-50/50 dark:from-slate-900/50 to-white dark:to-slate-950">
          <div className="container mx-auto max-w-4xl">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setActiveFeature(null);
                setSelectedRoute(null);
              }}
              className="mb-6 flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <span className="text-lg">←</span> {t('index.backOptions')}
            </motion.button>

            {/* Feature Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200/50 dark:border-slate-700"
            >
              {activeFeature === "route" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1">
                      Compare Fares
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Select a route to see all available transport options and their prices
                    </p>
                  </div>
                  <RouteSelector
                    selectedRoute={selectedRoute}
                    onRouteSelect={setSelectedRoute}
                    isStudent={isStudent}
                    onStudentToggle={setIsStudent}
                  />
                  {selectedRoute && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-t border-slate-200 dark:border-slate-700 pt-6"
                    >
                      <FareComparison route={selectedRoute} isStudent={isStudent} />
                    </motion.div>
                  )}
                </div>
              )}

              {activeFeature === "calculator" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1">
                      Monthly Cost Calculator
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Enter a distance to calculate your monthly transport costs
                    </p>
                  </div>
                  <CustomCalculator />
                </div>
              )}

              {activeFeature === "city" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1">
                      Inter-City Routes
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Compare prices between different cities
                    </p>
                  </div>
                  <CityComparison />
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 md:py-16 border-t border-slate-200/50 dark:border-slate-800 bg-gradient-to-b from-white dark:from-slate-950 to-slate-50 dark:to-slate-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {/* Brand */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <span className="text-lg font-black gradient-text">Transit Save</span>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2">
                Smart transit fare comparison
              </p>
            </div>

            {/* Cities Covered */}
            <div>
              <h4 className="font-bold text-sm mb-3">🏙️ Coverage</h4>
              <ul className="space-y-2 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                <li>🚌 <strong>Chennai</strong> - 50+ Routes</li>
                <li>🏛️ <strong>Trichy</strong> - 50+ Routes</li>
                <li>✈️ <strong>Airport Routes</strong> - Direct Connect</li>
                <li>📍 <strong>100+ Stops</strong> - Full Coverage</li>
              </ul>
            </div>

            {/* Transit Modes */}
            <div>
              <h4 className="font-bold text-sm mb-3">🚌 {t('footer.modes')}</h4>
              <ul className="space-y-3 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-teal-500/30 flex-shrink-0 shadow-sm transition-transform hover:scale-110">
                    <img src="/transport/bus.webp" alt="Bus" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-black text-slate-900 dark:text-white">MTC</span>
                    <p className="text-[10px] opacity-70">Ordinary & Deluxe</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0 shadow-sm transition-transform hover:scale-110">
                    <img src="/transport/metro.avif" alt="Metro" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-black text-slate-900 dark:text-white">Metro</span>
                    <p className="text-[10px] opacity-70">Fast & Efficient</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500/30 flex-shrink-0 shadow-sm transition-transform hover:scale-110">
                    <img src="/transport/train.webp" alt="Train" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-black text-slate-900 dark:text-white">Suburban</span>
                    <p className="text-[10px] opacity-70">Budget Friendly</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 opacity-60">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🚗</span>
                  </div>
                  <div>
                    <span className="font-black text-slate-900 dark:text-white">Private</span>
                    <p className="text-[10px] opacity-70">Premium Services</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Key Benefits */}
            <div>
              <h4 className="font-bold text-sm mb-3">🎯 Key Benefits</h4>
              <ul className="space-y-2 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                <li>💰 <strong>Save Up to 60%</strong> - Smart comparison</li>
                <li>⚡ <strong>Real-Time Fares</strong> - Accurate pricing</li>
                <li>🎓 <strong>Student Pass</strong> - MTC Ordinary FREE</li>
                <li>📱 <strong>Offline Access</strong> - Works anywhere</li>
              </ul>
            </div>
          </div>

          {/* Footer Middle Section - Travel Tips */}
          <div className="py-6 border-t border-b border-slate-200/50 dark:border-slate-800 bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 -mx-4 md:-mx-6 px-4 md:px-6 my-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <p className="font-bold text-xs md:text-sm text-slate-900 dark:text-white">Smart Routing</p>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Compare all modes to find the best option</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-xl">🎓</span>
                <div>
                  <p className="font-bold text-xs md:text-sm text-slate-900 dark:text-white">Student Passes</p>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">100% FREE on MTC Ordinary buses</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-xl">📊</span>
                <div>
                  <p className="font-bold text-xs md:text-sm text-slate-900 dark:text-white">Monthly Calculator</p>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Plan your budget for daily commute</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-slate-200/50 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-slate-500 dark:text-slate-400">
            <p>✅ {t('footer.verified')}</p>
            <p>&copy; 2024 Transit Save. All rights reserved.</p>
            <p>Made with ❤️ for smart travelers</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;

