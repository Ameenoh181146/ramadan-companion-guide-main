import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const RamadanCountdown = () => {
  const { t, language } = useLanguage();
  // Ramadan 2025 starts approximately March 1, 2025
  // This is an estimate - actual date depends on moon sighting
  const ramadanStart = new Date("2025-03-01T00:00:00");
  const ramadanEnd = new Date("2025-03-30T00:00:00");
  
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isRamadan = now >= ramadanStart && now <= ramadanEnd;
  const ramadanDay = isRamadan 
    ? Math.ceil((now.getTime() - ramadanStart.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const getDaysUntilRamadan = () => {
    if (now >= ramadanStart) return 0;
    const diff = ramadanStart.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysUntil = getDaysUntilRamadan();

  const texts = {
    th: {
      inRamadan: "เราอยู่ในเดือนรอมฎอน",
      day: "วันที่",
      of30: "จาก 30 วัน",
      until: "รอมฎอนจะมาถึงในอีก",
      days: "วัน",
      note: "* วันที่โดยประมาณ ขึ้นอยู่กับการดูจันทร์"
    },
    ms: {
      inRamadan: "Kita dalam bulan Ramadan",
      day: "Hari ke-",
      of30: "daripada 30 hari",
      until: "Ramadan akan tiba dalam",
      days: "hari",
      note: "* Tarikh anggaran, bergantung kepada anak bulan"
    }
  };

  const txt = texts[language];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative bg-gradient-to-br from-primary via-emerald-700 to-primary p-6 text-center">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <Star
                key={i}
                className="absolute text-accent/30 star-twinkle"
                size={Math.random() * 10 + 6}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
                fill="currentColor"
              />
            ))}
          </div>

          <div className="relative z-10">
            <Moon className="h-12 w-12 text-accent mx-auto mb-4 moon-glow" fill="currentColor" />
            
            {isRamadan ? (
              <>
                <p className="text-primary-foreground/80 text-sm mb-2">{txt.inRamadan}</p>
                <p className="text-5xl font-bold text-primary-foreground mb-2">
                  {txt.day} {ramadanDay}
                </p>
                <p className="text-primary-foreground/80">{txt.of30}</p>
                <div className="mt-4 h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${(ramadanDay / 30) * 100}%` }}
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-primary-foreground/80 text-sm mb-2">{txt.until}</p>
                <p className="text-5xl font-bold text-primary-foreground mb-2">
                  {daysUntil}
                </p>
                <p className="text-primary-foreground/80">{txt.days}</p>
                <p className="mt-4 text-sm text-primary-foreground/60">
                  {txt.note}
                </p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RamadanCountdown;
