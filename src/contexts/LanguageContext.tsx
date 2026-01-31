import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "th" | "ms";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  th: {
    // Header
    "header.title": "รอมฎอนมุบาร็อก",
    "header.subtitle": "แอปสำหรับมุสลิมะฮ์ในเดือนแห่งความบะรอกะฮ์",
    
    // Navigation
    "nav.fasting": "ถือศีลอด",
    "nav.quran": "กุรอาน",
    "nav.dua": "ดุอาอ์",
    "nav.dhikr": "ซิกร์",
    "nav.prayer": "ละหมาด",
    "nav.tips": "เคล็ดลับ",
    
    // Countdown
    "countdown.title": "นับถอยหลังสู่รอมฎอน",
    "countdown.ramadanStarted": "รอมฎอนเริ่มแล้ว!",
    "countdown.days": "วัน",
    "countdown.hours": "ชั่วโมง",
    "countdown.minutes": "นาที",
    "countdown.seconds": "วินาที",
    "countdown.blessed": "ขอให้เป็นเดือนที่เปี่ยมด้วยความบะรอกะฮ์",
    
    // Fasting Tracker
    "fasting.title": "บันทึกการถือศีลอด",
    "fasting.fastedDays": "วันที่ถือศีลอด",
    "fasting.excusedDays": "วันที่ต้องชดใช้",
    "fasting.madeUp": "ชดใช้แล้ว",
    "fasting.remaining": "คงเหลือ",
    "fasting.fasted": "ถือศีลอด",
    "fasting.excused": "มีอุปสรรค",
    "fasting.madeUpLabel": "ชดใช้แล้ว",
    "fasting.day": "วันที่",
    "fasting.tapToRecord": "👆 แตะที่วันที่เพื่อบันทึกสถานะ",
    "fasting.recordedFasted": "มาชาอัลลอฮ์! บันทึกวันถือศีลอดแล้ว 🌙",
    "fasting.recordedExcused": "บันทึกวันที่ต้องชดใช้แล้ว 💝",
    "fasting.madeUpSuccess": "อัลฮัมดุลิลลาฮ์! ชดใช้เรียบร้อยแล้ว ✨",
    
    // Quran Reader
    "quran.title": "อ่านอัลกุรอาน",
    "quran.overallProgress": "ความคืบหน้าทั้งหมด",
    "quran.pages": "หน้า",
    "quran.juz": "ญุซอ์ที่",
    "quran.todayGoal": "เป้าหมายวันนี้",
    "quran.goalReached": "บรรลุเป้าหมายแล้ว!",
    "quran.dailyGoal": "เป้าหมาย/วัน:",
    "quran.juzRead": "ญุซอ์ที่อ่านแล้ว",
    "quran.completedQuran": "มาชาอัลลอฮ์! คุณอ่านจบอัลกุรอานแล้ว! 🎉",
    "quran.dailyGoalReached": "บาร็อกัลลอฮุฟีก! บรรลุเป้าหมายวันนี้แล้ว! 🌟",
    
    // Dhikr
    "dhikr.title": "ตัสบีห์ / ซิกร์",
    "dhikr.reset": "รีเซ็ต",
    "dhikr.resetDone": "รีเซ็ตตัวนับแล้ว",
    "dhikr.completed": "มาชาอัลลอฮ์! ครบ {count} ครั้งแล้ว! 🌟",
    
    // Dua Collection
    "dua.title": "ดุอาอ์รอมฎอน",
    "dua.all": "ทั้งหมด",
    "dua.copied": "คัดลอกดุอาอ์แล้ว 📋",
    "dua.category.intention": "เนียต",
    "dua.category.iftar": "ละศีลอด",
    "dua.category.suhoor": "ซะโฮร์",
    "dua.category.lailatul": "ลัยละตุลก็อดร์",
    "dua.category.istighfar": "อิสติฆฟาร",
    "dua.category.blessing": "ขอพร",
    "dua.category.parents": "พ่อแม่",
    "dua.category.morning": "เช้า-เย็น",
    "dua.category.sleep": "ก่อนนอน",
    "dua.category.food": "อาหาร",
    
    // Prayer Times
    "prayer.title": "เวลาละหมาด",
    "prayer.fajr": "ฟัจร์ (ซุบฮ์)",
    "prayer.sunrise": "พระอาทิตย์ขึ้น",
    "prayer.dhuhr": "ซุฮ์รี",
    "prayer.asr": "อัศริ",
    "prayer.maghrib": "มัฆริบ (ละศีลอด)",
    "prayer.isha": "อิชาอ์",
    "prayer.nextPrayer": "ละหมาดถัดไป",
    "prayer.timeRemaining": "เหลือเวลา",
    "prayer.note": "* เวลาละหมาดเป็นค่าประมาณ กรุณาตรวจสอบกับมัสยิดในพื้นที่",
    
    // Ramadan Tips
    "tips.title": "เคล็ดลับรอมฎอน",
    
    // Footer
    "footer.madeWith": "สร้างด้วย 💚 สำหรับมุสลิมะฮ์ทุกคน",
    "footer.prayer": "ขอให้อัลลอฮ์ทรงรับอิบาดะฮ์ของเราทุกคน อามีน 🤲",
  },
  ms: {
    // Header
    "header.title": "Ramadan Mubarak",
    "header.subtitle": "Aplikasi untuk Muslimah di Bulan Berkat",
    
    // Navigation
    "nav.fasting": "Puasa",
    "nav.quran": "Quran",
    "nav.dua": "Doa",
    "nav.dhikr": "Zikir",
    "nav.prayer": "Solat",
    "nav.tips": "Tips",
    
    // Countdown
    "countdown.title": "Kira Detik ke Ramadan",
    "countdown.ramadanStarted": "Ramadan Telah Bermula!",
    "countdown.days": "Hari",
    "countdown.hours": "Jam",
    "countdown.minutes": "Minit",
    "countdown.seconds": "Saat",
    "countdown.blessed": "Semoga bulan ini penuh barakah",
    
    // Fasting Tracker
    "fasting.title": "Rekod Puasa",
    "fasting.fastedDays": "Hari Berpuasa",
    "fasting.excusedDays": "Hari Perlu Ganti",
    "fasting.madeUp": "Sudah Diganti",
    "fasting.remaining": "Baki",
    "fasting.fasted": "Berpuasa",
    "fasting.excused": "Uzur",
    "fasting.madeUpLabel": "Sudah Ganti",
    "fasting.day": "Hari",
    "fasting.tapToRecord": "👆 Ketik tarikh untuk rekod status",
    "fasting.recordedFasted": "MasyaAllah! Rekod puasa disimpan 🌙",
    "fasting.recordedExcused": "Rekod hari ganti disimpan 💝",
    "fasting.madeUpSuccess": "Alhamdulillah! Telah diganti ✨",
    
    // Quran Reader
    "quran.title": "Baca Al-Quran",
    "quran.overallProgress": "Kemajuan Keseluruhan",
    "quran.pages": "halaman",
    "quran.juz": "Juzuk",
    "quran.todayGoal": "Sasaran Hari Ini",
    "quran.goalReached": "Sasaran Tercapai!",
    "quran.dailyGoal": "Sasaran/Hari:",
    "quran.juzRead": "Juzuk Dibaca",
    "quran.completedQuran": "MasyaAllah! Anda telah khatam Al-Quran! 🎉",
    "quran.dailyGoalReached": "Barakallahu Fiik! Sasaran hari ini tercapai! 🌟",
    
    // Dhikr
    "dhikr.title": "Tasbih / Zikir",
    "dhikr.reset": "Reset",
    "dhikr.resetDone": "Kiraan direset",
    "dhikr.completed": "MasyaAllah! Sudah {count} kali! 🌟",
    
    // Dua Collection
    "dua.title": "Doa Ramadan",
    "dua.all": "Semua",
    "dua.copied": "Doa disalin 📋",
    "dua.category.intention": "Niat",
    "dua.category.iftar": "Berbuka",
    "dua.category.suhoor": "Sahur",
    "dua.category.lailatul": "Lailatul Qadr",
    "dua.category.istighfar": "Istighfar",
    "dua.category.blessing": "Berkat",
    "dua.category.parents": "Ibu Bapa",
    "dua.category.morning": "Pagi-Petang",
    "dua.category.sleep": "Sebelum Tidur",
    "dua.category.food": "Makanan",
    
    // Prayer Times
    "prayer.title": "Waktu Solat",
    "prayer.fajr": "Subuh",
    "prayer.sunrise": "Syuruk",
    "prayer.dhuhr": "Zohor",
    "prayer.asr": "Asar",
    "prayer.maghrib": "Maghrib (Berbuka)",
    "prayer.isha": "Isyak",
    "prayer.nextPrayer": "Solat Seterusnya",
    "prayer.timeRemaining": "Masa Berbaki",
    "prayer.note": "* Waktu solat adalah anggaran. Sila semak dengan masjid tempatan",
    
    // Ramadan Tips
    "tips.title": "Tips Ramadan",
    
    // Footer
    "footer.madeWith": "Dibuat dengan 💚 untuk semua Muslimah",
    "footer.prayer": "Semoga Allah menerima ibadah kita semua. Amin 🤲",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("app-language");
    return (saved as Language) || "th";
  });

  useEffect(() => {
    localStorage.setItem("app-language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
