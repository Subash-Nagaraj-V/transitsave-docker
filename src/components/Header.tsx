import { Moon, Sun, Languages } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "@/components/Logo";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2.5 group cursor-pointer transition-opacity hover:opacity-90">
          <Logo />
          <span className="text-lg md:text-xl font-bold font-heading tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Transit Save
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Language Switcher - Enhanced & More Visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-11 md:h-12 px-3 md:px-5 rounded-2xl bg-primary/5 hover:bg-primary/15 dark:bg-primary/10 dark:hover:bg-primary/20 transition-all border-2 border-primary/20 hover:border-primary/40 group shadow-lg shadow-primary/5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Languages className="h-5 w-5 md:h-6 md:w-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col items-start leading-none hidden sm:flex">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">Language</span>
                    <span className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                      {language === 'en' ? '🇬🇧 English' : '🇮🇳 தமிழ்'}
                    </span>
                  </div>
                  <span className="text-xl leading-none text-primary/50 group-hover:text-primary transition-colors ml-1">⌄</span>
                </div>
                <span className="sr-only">Switch language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl w-56 p-2 shadow-2xl border-2 border-primary/20">
              <div className="px-3 py-2 mb-2">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  🌐 Language
                </p>
              </div>
              <DropdownMenuItem
                onClick={() => setLanguage('en')}
                className={`rounded-lg px-4 py-3 cursor-pointer transition-all mb-1 ${language === 'en'
                    ? 'bg-primary/20 text-primary border-l-4 border-primary'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
              >
                <span className="mr-3 text-lg">🇬🇧</span>
                <div>
                  <p className="font-bold">English</p>
                  <p className="text-[11px] text-slate-500">International</p>
                </div>
                {language === 'en' && <span className="ml-auto text-primary text-lg">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('ta')}
                className={`rounded-lg px-4 py-3 cursor-pointer transition-all ${language === 'ta'
                    ? 'bg-primary/20 text-primary border-l-4 border-primary'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
              >
                <span className="mr-3 text-lg">🇮🇳</span>
                <div>
                  <p className="font-bold">தமிழ்</p>
                  <p className="text-[11px] text-slate-500">(Tamil - தமிழ்)</p>
                </div>
                {language === 'ta' && <span className="ml-auto text-primary text-lg">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-10 w-10 md:h-11 md:w-11 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-slate-600" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-400" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
