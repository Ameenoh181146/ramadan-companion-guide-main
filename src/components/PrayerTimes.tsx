import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Sun, Sunrise, Sunset, Moon, CloudSun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PrayerTime {
  name: string;
  nameKey: string;
  time: string;
  icon: React.ReactNode;
}

const PrayerTimes = () => {
  const { t, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  const prayerNames: Record<string, { th: string; ms: string }> = {
    fajr: { th: "ซุบฮ์", ms: "Subuh" },
    sunrise: { th: "ชุรูก", ms: "Syuruk" },
    dhuhr: { th: "ซุฮ์รี่", ms: "Zohor" },
    asr: { th: "อัศรี่", ms: "Asar" },
    maghrib: { th: "มัฆริบ", ms: "Maghrib" },
    isha: { th: "อิชาอ์", ms: "Isyak" },
  };
  
  const prayerTimes: PrayerTime[] = [
    { name: "Fajr", nameKey: "fajr", time: "05:15", icon: <Sunrise className="h-6 w-6" /> },
    { name: "Sunrise", nameKey: "sunrise", time: "06:30", icon: <Sun className="h-6 w-6" /> },
    { name: "Dhuhr", nameKey: "dhuhr", time: "12:20", icon: <CloudSun className="h-6 w-6" /> },
    { name: "Asr", nameKey: "asr", time: "15:45", icon: <Sun className="h-6 w-6" /> },
    { name: "Maghrib", nameKey: "maghrib", time: "18:30", icon: <Sunset className="h-6 w-6" /> },
    { name: "Isha", nameKey: "isha", time: "19:45", icon: <Moon className="h-6 w-6" /> },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === "th" ? "th-TH" : "ms-MY", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getNextPrayer = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    for (const prayer of prayerTimes) {
      const [hours, mins] = prayer.time.split(":").map(Number);
      const prayerMins = hours * 60 + mins;
      if (prayerMins > now) {
        return prayer;
      }
    }
    return prayerTimes[0];
  };

  const nextPrayer = getNextPrayer();

  const getTimeUntilNext = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const [hours, mins] = nextPrayer.time.split(":").map(Number);
    let prayerMins = hours * 60 + mins;
    
    if (prayerMins <= now) {
      prayerMins += 24 * 60;
    }
    
    const diff = prayerMins - now;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    
    return language === "th" 
      ? `${h} ชม. ${m} นาที`
      : `${h} jam ${m} minit`;
  };

  const texts = {
    th: {
      currentTime: "เวลาปัจจุบัน",
      nextPrayer: "ละหมาดถัดไป",
      remaining: "อีก",
      note: "* เวลาอาจแตกต่างตามพื้นที่ กรุณาตรวจสอบเวลาละหมาดในพื้นที่ของคุณ"
    },
    ms: {
      currentTime: "Waktu Sekarang",
      nextPrayer: "Solat Seterusnya",
      remaining: "Lagi",
      note: "* Waktu mungkin berbeza mengikut kawasan. Sila semak waktu solat di kawasan anda"
    }
  };

  const txt = texts[language];

  return (
    <Card className="card-islamic">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Clock className="h-6 w-6 text-primary" />
          {t("prayer.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Time */}
        <div className="text-center p-5 rounded-2xl bg-gradient-to-r from-primary to-accent">
          <p className="text-primary-foreground/80 text-sm mb-1">{txt.currentTime}</p>
          <p className="text-4xl font-bold text-primary-foreground font-mono">
            {formatTime(currentTime)}
          </p>
        </div>

        {/* Next Prayer */}
        <div className="p-5 rounded-2xl bg-secondary/50 text-center">
          <p className="text-sm text-muted-foreground mb-1">{txt.nextPrayer}</p>
          <p className="text-2xl font-bold text-primary">{prayerNames[nextPrayer.nameKey][language]}</p>
          <p className="text-xl font-mono mt-1">{nextPrayer.time}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {txt.remaining} {getTimeUntilNext()}
          </p>
        </div>

        {/* All Prayer Times */}
        <div className="space-y-2">
          {prayerTimes.map((prayer) => (
            <div
              key={prayer.name}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                prayer.name === nextPrayer.name
                  ? "bg-primary/10 border-2 border-primary"
                  : "bg-muted/50"
              }`}
            >
              <div className={`${prayer.name === nextPrayer.name ? "text-primary" : "text-muted-foreground"}`}>
                {prayer.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-base">{prayerNames[prayer.nameKey][language]}</p>
              </div>
              <p className="text-lg font-mono font-medium">{prayer.time}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          {txt.note}
        </p>
      </CardContent>
    </Card>
  );
};

export default PrayerTimes;
