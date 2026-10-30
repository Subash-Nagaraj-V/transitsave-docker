import { Share2, MessageCircle, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Route, type TransportMode, fareStructure, calculateFare } from "@/data/routes";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShareButtonProps {
  route: Route;
  isStudent: boolean;
  cheapestMode: TransportMode;
  cheapestFare: number;
}

export function ShareButton({ route, isStudent, cheapestMode, cheapestFare }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const generateShareText = () => {
    const modeInfo = fareStructure[cheapestMode];
    const lines = [
      `🚌 Transit Save - Fare Comparison`,
      ``,
      `📍 ${route.from} → ${route.to}`,
      `📏 Distance: ${route.distance} km`,
      isStudent ? `🎓 Student discount applied` : '',
      ``,
      `💰 Cheapest: ${modeInfo.shortName} at ₹${cheapestFare}/trip`,
      ``,
      `Compare fares at: transitsave.app`
    ].filter(Boolean);
    
    return lines.join('\n');
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/40 transition-all"
          >
            <Share2 className="w-4 h-4" />
            {t('share.button')}
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl">
        <DropdownMenuItem 
          onClick={handleWhatsAppShare} 
          className="gap-3 cursor-pointer py-2.5 px-3 rounded-lg hover:bg-green-50 transition-colors active:scale-95"
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4 text-green-500" />
          </motion.div>
          <span className="font-medium">WhatsApp</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleCopy} 
          className="gap-3 cursor-pointer py-2.5 px-3 rounded-lg hover:bg-blue-50 transition-colors active:scale-95"
        >
          <motion.div
            animate={copied ? { rotate: 360 } : {}}
            transition={{ duration: 0.5 }}
            key={copied ? 'check' : 'copy'}
            className="flex items-center justify-center"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-blue-500" />
            )}
          </motion.div>
          <span className="font-medium">
            {copied ? t('share.copied') : t('share.copy')}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
