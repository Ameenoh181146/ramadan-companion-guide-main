import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface DhikrItem {
  id: number;
  arabic: string;
  transliteration: { th: string; ms: string };
  meaning: { th: string; ms: string };
  target: number;
  reward: { th: string; ms: string };
}

const dhikrList: DhikrItem[] = [
  {
    id: 1,
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: { th: "สุบฮานัลลอฮ์", ms: "Subhanallah" },
    meaning: { th: "มหาบริสุทธิ์แด่อัลลอฮ์", ms: "Maha Suci Allah" },
    target: 33,
    reward: { th: "ผลบุญมหาศาล", ms: "Pahala Besar" }
  },
  {
    id: 2,
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: { th: "อัลฮัมดุลิลลาฮ์", ms: "Alhamdulillah" },
    meaning: { th: "มวลการสรรเสริญเป็นของอัลลอฮ์", ms: "Segala Puji bagi Allah" },
    target: 33,
    reward: { th: "ตาชั่งแห่งความดี", ms: "Timbangan Kebaikan" }
  },
  {
    id: 3,
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: { th: "อัลลอฮุอักบัร", ms: "Allahu Akbar" },
    meaning: { th: "อัลลอฮ์ทรงยิ่งใหญ่", ms: "Allah Maha Besar" },
    target: 34,
    reward: { th: "สูงส่งในสรวงสวรรค์", ms: "Tinggi di Syurga" }
  },
  {
    id: 4,
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    transliteration: { th: "ลา อิลาฮะ อิลลัลลอฮ์", ms: "La Ilaha Illallah" },
    meaning: { th: "ไม่มีพระเจ้าอื่นใดนอกจากอัลลอฮ์", ms: "Tiada Tuhan Selain Allah" },
    target: 100,
    reward: { th: "ประตูสู่สรวงสวรรค์", ms: "Pintu ke Syurga" }
  },
  {
    id: 5,
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: { th: "อัสตัฆฟิรุลลอฮ์", ms: "Astaghfirullah" },
    meaning: { th: "ข้าพระองค์ขออภัยโทษต่ออัลลอฮ์", ms: "Aku Mohon Ampun kepada Allah" },
    target: 100,
    reward: { th: "ลบล้างบาป", ms: "Menghapus Dosa" }
  },
  {
    id: 6,
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: { th: "สุบฮานัลลอฮิ วะบิฮัมดิฮี", ms: "Subhanallahi Wabihamdihi" },
    meaning: { th: "มหาบริสุทธิ์แด่อัลลอฮ์และด้วยการสรรเสริญพระองค์", ms: "Maha Suci Allah dan Segala Puji bagi-Nya" },
    target: 100,
    reward: { th: "ต้นอินทผลัมในสวรรค์", ms: "Pokok Kurma di Syurga" }
  },
];

const Dhikr = () => {
  const { t, language } = useLanguage();
  const [counts, setCounts] = useState<{ [key: number]: number }>(() => {
    const saved = localStorage.getItem("dhikr-counts");
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedDhikr, setSelectedDhikr] = useState<DhikrItem>(dhikrList[0]);

  useEffect(() => {
    localStorage.setItem("dhikr-counts", JSON.stringify(counts));
  }, [counts]);

  const increment = () => {
    const currentCount = counts[selectedDhikr.id] || 0;
    const newCount = currentCount + 1;
    
    setCounts(prev => ({
      ...prev,
      [selectedDhikr.id]: newCount
    }));

    if (newCount === selectedDhikr.target) {
      toast.success(t("dhikr.completed").replace("{count}", String(selectedDhikr.target)));
    }
  };

  const reset = () => {
    setCounts(prev => ({
      ...prev,
      [selectedDhikr.id]: 0
    }));
    toast.info(t("dhikr.resetDone"));
  };

  const currentCount = counts[selectedDhikr.id] || 0;
  const progress = (currentCount / selectedDhikr.target) * 100;

  return (
    <Card className="card-islamic">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Heart className="h-6 w-6 text-primary" fill="currentColor" />
          {t("dhikr.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Dhikr Selection - Scrollable */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
          {dhikrList.map((dhikr) => (
            <Button
              key={dhikr.id}
              variant={selectedDhikr.id === dhikr.id ? "default" : "outline"}
              onClick={() => setSelectedDhikr(dhikr)}
              className="whitespace-nowrap h-12 px-4 flex-shrink-0"
            >
              {dhikr.transliteration[language]}
            </Button>
          ))}
        </div>

        {/* Selected Dhikr Display */}
        <div className="text-center space-y-3 p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5">
          <p className="font-arabic text-4xl text-foreground leading-relaxed">
            {selectedDhikr.arabic}
          </p>
          <p className="text-lg font-medium text-primary">
            {selectedDhikr.transliteration[language]}
          </p>
          <p className="text-sm text-muted-foreground">
            {selectedDhikr.meaning[language]}
          </p>
        </div>

        {/* Counter - Large Touch Target */}
        <div className="flex justify-center">
          <div className="relative">
            <svg className="w-56 h-56 transform -rotate-90">
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                strokeDasharray={2 * Math.PI * 100}
                strokeDashoffset={2 * Math.PI * 100 * (1 - Math.min(progress, 100) / 100)}
                className="text-primary transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>
            
            <button
              onClick={increment}
              className="absolute inset-5 rounded-full bg-gradient-to-br from-primary to-accent flex flex-col items-center justify-center text-primary-foreground shadow-lg active:scale-95 transition-transform"
            >
              <span className="text-5xl font-bold">{currentCount}</span>
              <span className="text-lg opacity-80">/ {selectedDhikr.target}</span>
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <Button variant="outline" onClick={reset} className="h-12 px-6 gap-2">
            <RotateCcw className="h-5 w-5" />
            {t("dhikr.reset")}
          </Button>
        </div>

        {/* Reward Info */}
        <div className="text-center p-4 rounded-xl bg-accent/10">
          <p className="text-sm text-muted-foreground">
            ✨ {selectedDhikr.reward[language]}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dhikr;
