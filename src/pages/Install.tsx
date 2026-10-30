import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Smartphone, CheckCircle, Share, Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{t('install.title')}</h1>
            <p className="text-muted-foreground">{t('install.description')}</p>
          </div>

          {isInstalled ? (
            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">{t('install.installed')}</p>
                    <p className="text-sm text-green-600/80 dark:text-green-400/80">
                      {t('install.installedDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : isIOS ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share className="w-5 h-5" />
                  {t('install.iosTitle')}
                </CardTitle>
                <CardDescription>{t('install.iosDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">{t('install.step1')}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      {t('install.tapShare')} <Share className="w-4 h-4" />
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">{t('install.step2')}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      {t('install.addHome')} <Plus className="w-4 h-4" />
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium">{t('install.step3')}</p>
                    <p className="text-sm text-muted-foreground">{t('install.tapAdd')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : deferredPrompt ? (
            <Card>
              <CardContent className="pt-6">
                <Button onClick={handleInstall} className="w-full" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  {t('install.button')}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MoreVertical className="w-5 h-5" />
                  {t('install.androidTitle')}
                </CardTitle>
                <CardDescription>{t('install.androidDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">{t('install.openMenu')}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      {t('install.tapMenu')} <MoreVertical className="w-4 h-4" />
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">{t('install.selectInstall')}</p>
                    <p className="text-sm text-muted-foreground">{t('install.installApp')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="mt-8 grid gap-4">
            <h2 className="text-lg font-semibold text-center">{t('install.whyInstall')}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "⚡", title: t('install.feature1'), desc: t('install.feature1Desc') },
                { icon: "📱", title: t('install.feature2'), desc: t('install.feature2Desc') },
                { icon: "🔒", title: t('install.feature3'), desc: t('install.feature3Desc') },
                { icon: "🚀", title: t('install.feature4'), desc: t('install.feature4Desc') },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <p className="font-medium mt-2">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Button variant="ghost" asChild>
              <a href="/">{t('install.backHome')}</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}