import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "th" ? "ms" : "th");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="h-10 px-3 gap-2 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">
        {language === "th" ? "🇹🇭 TH" : "🇲🇾 MS"}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;
