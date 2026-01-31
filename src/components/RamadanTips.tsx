import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Heart, Moon, BookOpen, Users, Utensils } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Tip {
  icon: React.ReactNode;
  title: { th: string; ms: string };
  content: { th: string; ms: string };
}

const tips: Tip[] = [
  {
    icon: <Moon className="h-6 w-6" />,
    title: { th: "ตื่นทำซะโฮร์", ms: "Bangun Bersahur" },
    content: { 
      th: "ซะโฮร์มีความบะรอกะฮ์ อย่าพลาดแม้จะเป็นแค่แก้วน้ำ ท่านนบี ﷺ กล่าวว่า 'จงทานซะโฮร์เถิด เพราะในซะโฮร์มีความบะรอกะฮ์'",
      ms: "Sahur ada keberkatan. Jangan tinggalkan walaupun hanya segelas air. Nabi ﷺ bersabda: 'Bersahurlah kerana dalam sahur ada keberkatan'"
    }
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: { th: "อ่านอัลกุรอาน", ms: "Baca Al-Quran" },
    content: { 
      th: "รอมฎอนคือเดือนแห่งอัลกุรอาน พยายามอ่านให้มากที่สุด แม้จะเป็นวันละหน้าก็ดี",
      ms: "Ramadan adalah bulan Al-Quran. Cuba baca sebanyak mungkin, walaupun sehalaman sehari"
    }
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: { th: "มากดุอาอ์", ms: "Banyak Berdoa" },
    content: { 
      th: "ดุอาอ์ของผู้ถือศีลอดจะไม่ถูกปฏิเสธ โดยเฉพาะช่วงก่อนละศีลอด จงขอดุอาอ์ให้มากในเวลานี้",
      ms: "Doa orang berpuasa tidak ditolak, terutama sebelum berbuka. Perbanyakkan doa pada waktu ini"
    }
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: { th: "เลี้ยงละศีลอด", ms: "Berbuka Bersama" },
    content: { 
      th: "ผู้ที่เลี้ยงอาหารละศีลอดแก่ผู้ถือศีลอด จะได้รับผลบุญเท่ากับผู้ถือศีลอดโดยไม่ลดหย่อน",
      ms: "Sesiapa yang memberi makanan berbuka kepada orang berpuasa, akan mendapat pahala sama tanpa dikurangkan"
    }
  },
  {
    icon: <Utensils className="h-6 w-6" />,
    title: { th: "อย่ากินมากเกินไป", ms: "Jangan Makan Berlebihan" },
    content: { 
      th: "การกินมากทำให้ง่วงและเกียจคร้านในการอิบาดะฮ์ จงกินแต่พอดี เพื่อจะได้มีแรงละหมาดและอิบาดะฮ์",
      ms: "Makan berlebihan menyebabkan mengantuk dan malas beribadah. Makanlah secukupnya supaya ada tenaga untuk solat dan ibadah"
    }
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: { th: "ค้นหาลัยละตุลก็อดร์", ms: "Cari Lailatul Qadr" },
    content: { 
      th: "คืนลัยละตุลก็อดร์ดีกว่า 1,000 เดือน อยู่ในคืนเลขคี่ของ 10 วันสุดท้าย (คืน 21, 23, 25, 27, 29)",
      ms: "Malam Lailatul Qadr lebih baik dari 1,000 bulan. Ia pada malam ganjil 10 akhir Ramadan (malam 21, 23, 25, 27, 29)"
    }
  },
];

const RamadanTips = () => {
  const { t, language } = useLanguage();

  return (
    <Card className="card-islamic">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Lightbulb className="h-6 w-6 text-accent" />
          {t("tips.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-border/50 active:scale-[0.99] transition-transform"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {tip.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1 text-base">{tip.title[language]}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.content[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RamadanTips;
