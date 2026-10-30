import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Clock, AlertCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Alert {
  id: string;
  type: "strike" | "delay" | "holiday" | "maintenance";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  timestamp: Date;
}

export function TransitAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "strike",
      title: "Route 5 Delay",
      description: "Expected 15-20 minute delay due to traffic congestion",
      severity: "medium",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "holiday",
      title: "Sunday Holiday Schedule",
      description: "Reduced frequency on all routes tomorrow",
      severity: "low",
      timestamp: new Date(),
    },
  ]);

  const [visibleAlerts, setVisibleAlerts] = useState(alerts);
  const { t } = useLanguage();

  const removeAlert = (id: string) => {
    setVisibleAlerts(visibleAlerts.filter((alert) => alert.id !== id));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-50 border-red-200 text-red-900";
      case "medium":
        return "bg-yellow-50 border-yellow-200 text-yellow-900";
      case "low":
        return "bg-blue-50 border-blue-200 text-blue-900";
      default:
        return "bg-slate-50 border-slate-200 text-slate-900";
    }
  };

  const getIconColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-slate-600";
    }
  };

  if (visibleAlerts.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-4 md:px-6 py-4" role="region" aria-label="Transit alerts">
      <div className="container mx-auto">
        <AnimatePresence mode="popLayout">
          {visibleAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`mb-3 p-4 rounded-xl border-2 backdrop-blur-sm flex items-start justify-between gap-3 ${getSeverityColor(
                alert.severity
              )}`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`${getIconColor(alert.severity)} mt-0.5 flex-shrink-0`}>
                  {alert.type === "strike" && <AlertTriangle size={20} />}
                  {alert.type === "delay" && <Clock size={20} />}
                  {(alert.type === "holiday" || alert.type === "maintenance") && (
                    <AlertCircle size={20} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm md:text-base">{alert.title}</h3>
                  <p className="text-xs md:text-sm opacity-90 mt-1 break-words">
                    {alert.description}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => removeAlert(alert.id)}
                className="flex-shrink-0 p-1 hover:bg-white/50 rounded-lg transition-colors"
                aria-label={`Dismiss alert: ${alert.title}`}
              >
                <X size={18} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
