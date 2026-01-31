import { Moon, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-primary via-emerald-700 to-primary py-8 px-4">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Decorative stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-gold-light/30 star-twinkle"
            size={Math.random() * 12 + 8}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-4 flex items-center justify-center gap-4">
          <Moon className="h-12 w-12 text-accent moon-glow" fill="currentColor" />
        </div>
        
        <h1 className="font-arabic text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
          رَمَضَانَ كَرِيمٌ
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
          {t("header.title")}
        </h2>
        <p className="text-primary-foreground/80 text-lg">
          {t("header.subtitle")}
        </p>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-8 md:h-12">
          <path
            fill="hsl(var(--background))"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </header>
  );
};

export default Header;
