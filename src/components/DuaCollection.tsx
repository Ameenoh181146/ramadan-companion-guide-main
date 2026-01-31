import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Dua {
  id: number;
  title: { th: string; ms: string };
  arabic: string;
  transliteration: { th: string; ms: string };
  meaning: { th: string; ms: string };
  category: { th: string; ms: string };
}

const duas: Dua[] = [
  // ดุอาอ์ถือศีลอด
  {
    id: 1,
    title: { th: "เนียตถือศีลอด", ms: "Niat Puasa" },
    arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هٰذِهِ السَّنَةِ لِلّٰهِ تَعَالٰى",
    transliteration: { 
      th: "นะวัยตุ เศามะ ฆ็อดิน อัน อะดาอิ ฟัรดิ ชะฮ์รี รอมะฎอนะ ฮาซิฮิส สะนะติ ลิลลาฮิ ตะอาลา",
      ms: "Nawaitu sauma ghadin 'an adaa'i fardhi syahri Ramadana haazihis sanati lillahi ta'ala"
    },
    meaning: { 
      th: "ข้าพเจ้าตั้งใจถือศีลอดพรุ่งนี้ เพื่อปฏิบัติฟัรดูเดือนรอมฎอนปีนี้ เพื่ออัลลอฮ์ ผู้ทรงสูงส่ง",
      ms: "Sahaja aku berpuasa esok hari menunaikan fardu bulan Ramadan tahun ini kerana Allah Taala"
    },
    category: { th: "เนียต", ms: "Niat" }
  },
  {
    id: 2,
    title: { th: "ดุอาอ์ละศีลอด (อิฟตาร)", ms: "Doa Berbuka Puasa" },
    arabic: "اللَّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    transliteration: { 
      th: "อัลลอฮุมมะ ละกะ ศุมตุ วะบิกะ อามันตุ วะอะลา ริซกิกะ อัฟตอรตุ",
      ms: "Allahumma laka sumtu wa bika aamantu wa 'ala rizqika aftartu"
    },
    meaning: { 
      th: "โอ้อัลลอฮ์ ข้าพระองค์ถือศีลอดเพื่อพระองค์ และศรัทธาต่อพระองค์ และละศีลอดด้วยริซกีของพระองค์",
      ms: "Ya Allah, untuk-Mu aku berpuasa, kepada-Mu aku beriman, dan dengan rezeki-Mu aku berbuka"
    },
    category: { th: "ละศีลอด", ms: "Berbuka" }
  },
  {
    id: 3,
    title: { th: "ดุอาอ์ละศีลอด (ฉบับที่ 2)", ms: "Doa Berbuka (Versi 2)" },
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration: { 
      th: "ซะฮะบัซ ซอมะอุ วับตัลละติล อุรูก วะษะบะตัล อัจรุ อินชาอัลลอฮ์",
      ms: "Zahabaz zama'u wabtallatil 'uruuqu wa tsabatal ajru insyaa Allah"
    },
    meaning: { 
      th: "ความกระหายได้หายไป เส้นเลือดได้รับความชุ่มชื้น และผลบุญได้ถูกบันทึกไว้แล้ว อินชาอัลลอฮ์",
      ms: "Telah hilang dahaga, urat-urat telah basah, dan pahala telah ditetapkan, insya-Allah"
    },
    category: { th: "ละศีลอด", ms: "Berbuka" }
  },
  {
    id: 4,
    title: { th: "ดุอาอ์ก่อนรับประทานซะโฮร์", ms: "Doa Sebelum Sahur" },
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ بَرَكَةَ السَّحُورِ",
    transliteration: { 
      th: "อัลลอฮุมมะ อินนี อัสอะลุกะ บะรอกะตัส สะฮูร",
      ms: "Allahumma inni as'aluka barakatas sahur"
    },
    meaning: { 
      th: "โอ้อัลลอฮ์ ข้าพระองค์ขอความบะรอกะฮ์จากซะโฮร์",
      ms: "Ya Allah, aku memohon keberkatan sahur"
    },
    category: { th: "ซะโฮร์", ms: "Sahur" }
  },
  // ดุอาอ์ลัยละตุลก็อดร์
  {
    id: 5,
    title: { th: "ดุอาอ์คืนลัยละตุลก็อดร์", ms: "Doa Malam Lailatul Qadr" },
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: { 
      th: "อัลลอฮุมมะ อินนะกะ อะฟุววุน ตุฮิบบุลอัฟวะ ฟะอ์ฟุ อันนี",
      ms: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni"
    },
    meaning: { 
      th: "โอ้อัลลอฮ์ แท้จริงพระองค์ทรงอภัย พระองค์ทรงรักการอภัย ดังนั้นโปรดอภัยให้แก่ข้าพระองค์ด้วยเถิด",
      ms: "Ya Allah, sesungguhnya Engkau Maha Pengampun, Engkau suka mengampuni, maka ampunilah aku"
    },
    category: { th: "ลัยละตุลก็อดร์", ms: "Lailatul Qadr" }
  },
  // ดุอาอ์อิสติฆฟาร
  {
    id: 6,
    title: { th: "อิสติฆฟาร (ขออภัยโทษ)", ms: "Istighfar (Minta Ampun)" },
    arabic: "أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    transliteration: { 
      th: "อัสตัฆฟิรุลลอฮัลละซี ลา อิลาฮะ อิลลา ฮุวัลฮัยยุล ก็อยยูม วะอะตูบุ อิลัยฮ์",
      ms: "Astaghfirullahal ladzi laa ilaaha illa huwal hayyul qayyuum wa atuubu ilaihi"
    },
    meaning: { 
      th: "ข้าพระองค์ขออภัยโทษต่ออัลลอฮ์ ผู้ไม่มีพระเจ้าอื่นใดนอกจากพระองค์ ผู้ทรงมีชีวิต ผู้ทรงดำรงอยู่ด้วยพระองค์เอง และข้าพระองค์ขอกลับตัวสู่พระองค์",
      ms: "Aku memohon ampun kepada Allah yang tiada Tuhan selain-Nya, Yang Maha Hidup, Yang Maha Berdiri Sendiri, dan aku bertaubat kepada-Nya"
    },
    category: { th: "อิสติฆฟาร", ms: "Istighfar" }
  },
  {
    id: 7,
    title: { th: "สัยยิดุลอิสติฆฟาร", ms: "Sayyidul Istighfar" },
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
    transliteration: { 
      th: "อัลลอฮุมมะ อันตะ ร็อบบี ลา อิลาฮะ อิลลา อันตะ ค็อลักตะนี วะอะนา อับดุกะ วะอะนา อะลา อะฮ์ดิกะ วะวะอ์ดิกะ มัสตะเตาะอ์ตุ",
      ms: "Allahumma anta rabbi laa ilaaha illa anta khalaqtani wa ana 'abduka wa ana 'ala 'ahdika wa wa'dika mastatha'tu"
    },
    meaning: { 
      th: "โอ้อัลลอฮ์ พระองค์คือพระผู้อภิบาลของข้าพระองค์ ไม่มีพระเจ้าอื่นใดนอกจากพระองค์ พระองค์ทรงสร้างข้าพระองค์ และข้าพระองค์คือบ่าวของพระองค์...",
      ms: "Ya Allah, Engkau Tuhanku, tiada Tuhan selain Engkau, Engkau menciptakan aku dan aku hamba-Mu..."
    },
    category: { th: "อิสติฆฟาร", ms: "Istighfar" }
  },
  // ดุอาอ์ขอพร
  {
    id: 8,
    title: { th: "ดุอาอ์ขอความดีโลกนี้และโลกหน้า", ms: "Doa Kebaikan Dunia Akhirat" },
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: { 
      th: "ร็อบบะนา อาตินา ฟิดดุนยา ฮะสะนะตัน วะฟิลอาคิรอติ ฮะสะนะตัน วะกินา อะซาบันนาร",
      ms: "Rabbana atina fid dunya hasanatan wa fil aakhirati hasanatan wa qina 'azaaban naar"
    },
    meaning: { 
      th: "โอ้พระผู้อภิบาลของเรา โปรดประทานความดีในโลกนี้และความดีในโลกหน้าแก่เรา และโปรดปกป้องเราจากไฟนรก",
      ms: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan peliharalah kami dari azab neraka"
    },
    category: { th: "ขอพร", ms: "Permohonan" }
  },
  {
    id: 9,
    title: { th: "ดุอาอ์ขอความอดทน", ms: "Doa Minta Kesabaran" },
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: { 
      th: "ร็อบบะนา อัฟริฆ อะลัยนา ศ็อบรัน วะษับบิต อักดามะนา วันศุรนา อะลัลเกามิลกาฟิรีน",
      ms: "Rabbana afrigh 'alaina sabran wa tsabbit aqdaamana wansurna 'alal qaumil kaafirin"
    },
    meaning: { 
      th: "โอ้พระผู้อภิบาลของเรา โปรดประทานความอดทนแก่เรา และโปรดให้เท้าของเรามั่นคง และโปรดช่วยเหลือเราเหนือกลุ่มชนผู้ปฏิเสธ",
      ms: "Ya Tuhan kami, limpahkanlah kesabaran kepada kami, teguhkanlah pendirian kami dan tolonglah kami terhadap orang-orang kafir"
    },
    category: { th: "ขอพร", ms: "Permohonan" }
  },
  {
    id: 10,
    title: { th: "ดุอาอ์ขอทางนำ", ms: "Doa Minta Petunjuk" },
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ",
    transliteration: { 
      th: "ร็อบบะนา ลา ตุซิฆ กุลูบะนา บะอ์ดะ อิซ ฮะดัยตะนา วะฮับ ละนา มินละดุนกะ รอห์มะตัน อินนะกะ อันตัลวะฮ์ฮาบ",
      ms: "Rabbana laa tuzigh quluubana ba'da idz hadaitana wa hab lana min ladunka rahmatan innaka antal wahhaab"
    },
    meaning: { 
      th: "โอ้พระผู้อภิบาลของเรา โปรดอย่าให้หัวใจของเราหลงผิดหลังจากที่พระองค์ทรงนำทางเราแล้ว และโปรดประทานความเมตตาจากพระองค์แก่เรา แท้จริงพระองค์คือผู้ประทานอย่างมากมาย",
      ms: "Ya Tuhan kami, janganlah Engkau jadikan hati kami condong kepada kesesatan setelah Engkau beri petunjuk kepada kami, dan kurniakanlah kepada kami rahmat dari sisi-Mu, sesungguhnya Engkaulah Maha Pemberi"
    },
    category: { th: "ขอพร", ms: "Permohonan" }
  },
  // ดุอาอ์สำหรับพ่อแม่
  {
    id: 11,
    title: { th: "ดุอาอ์ให้พ่อแม่", ms: "Doa untuk Ibu Bapa" },
    arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    transliteration: { 
      th: "ร็อบบิฆฟิรลี วะลิวาลิดัยยะ วะลิลมุอ์มินีนะ เยามะ ยะกูมุลฮิซาบ",
      ms: "Rabbighfirli wa liwaalidayya wa lil mu'minina yauma yaquumul hisaab"
    },
    meaning: { 
      th: "โอ้พระผู้อภิบาลของข้าพระองค์ โปรดอภัยให้แก่ข้าพระองค์และพ่อแม่ของข้าพระองค์ และบรรดาผู้ศรัทธาในวันแห่งการคิดบัญชี",
      ms: "Ya Tuhanku, ampunilah aku dan kedua ibu bapaku dan orang-orang mukmin pada hari berlakunya hisab"
    },
    category: { th: "พ่อแม่", ms: "Ibu Bapa" }
  },
  {
    id: 12,
    title: { th: "ดุอาอ์เมตตาพ่อแม่", ms: "Doa Rahmat Ibu Bapa" },
    arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: { 
      th: "ร็อบบิรฮัมฮุมา กะมา ร็อบบะยานี ศ็อฆีรอ",
      ms: "Rabbirhamhuma kama rabbayaani shaghira"
    },
    meaning: { 
      th: "โอ้พระผู้อภิบาลของข้าพระองค์ โปรดเมตตาท่านทั้งสองเหมือนที่ท่านทั้งสองได้เลี้ยงดูข้าพระองค์ตั้งแต่เล็ก",
      ms: "Ya Tuhanku, rahmatilah mereka berdua sebagaimana mereka berdua telah mendidikku waktu kecil"
    },
    category: { th: "พ่อแม่", ms: "Ibu Bapa" }
  },
  // ดุอาอ์เช้า-เย็น
  {
    id: 13,
    title: { th: "ดุอาอ์ตอนเช้า", ms: "Doa Pagi" },
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    transliteration: { 
      th: "อัศบะห์นา วะอัศบะฮัลมุลกุ ลิลลาฮ์ วัลฮัมดุลิลลาฮ์ ลา อิลาฮะ อิลลัลลอฮ์ วะห์ดะฮู ลา ชะรีกะ ละฮู",
      ms: "Ashbahna wa ashbahal mulku lillah walhamdulillah laa ilaaha illallahu wahdahu laa syariika lahu"
    },
    meaning: { 
      th: "เราได้เข้าสู่ยามเช้าและอำนาจทั้งหมดเป็นของอัลลอฮ์ มวลการสรรเสริญเป็นของอัลลอฮ์ ไม่มีพระเจ้าอื่นใดนอกจากอัลลอฮ์เพียงองค์เดียว ไม่มีภาคีใดสำหรับพระองค์",
      ms: "Kami memasuki waktu pagi dan kerajaan adalah milik Allah, segala puji bagi Allah, tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya"
    },
    category: { th: "เช้า-เย็น", ms: "Pagi-Petang" }
  },
  {
    id: 14,
    title: { th: "ดุอาอ์ตอนเย็น", ms: "Doa Petang" },
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    transliteration: { 
      th: "อัมซัยนา วะอัมซัลมุลกุ ลิลลาฮ์ วัลฮัมดุลิลลาฮ์ ลา อิลาฮะ อิลลัลลอฮ์ วะห์ดะฮู ลา ชะรีกะ ละฮู",
      ms: "Amsaina wa amsal mulku lillah walhamdulillah laa ilaaha illallahu wahdahu laa syariika lahu"
    },
    meaning: { 
      th: "เราได้เข้าสู่ยามเย็นและอำนาจทั้งหมดเป็นของอัลลอฮ์ มวลการสรรเสริญเป็นของอัลลอฮ์ ไม่มีพระเจ้าอื่นใดนอกจากอัลลอฮ์เพียงองค์เดียว ไม่มีภาคีใดสำหรับพระองค์",
      ms: "Kami memasuki waktu petang dan kerajaan adalah milik Allah, segala puji bagi Allah, tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya"
    },
    category: { th: "เช้า-เย็น", ms: "Pagi-Petang" }
  },
  // ดุอาอ์ก่อนนอน
  {
    id: 15,
    title: { th: "ดุอาอ์ก่อนนอน", ms: "Doa Sebelum Tidur" },
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: { 
      th: "บิสมิกัลลอฮุมมะ อะมูตุ วะอะห์ยา",
      ms: "Bismikallahumma amuutu wa ahya"
    },
    meaning: { 
      th: "ด้วยพระนามของพระองค์ โอ้อัลลอฮ์ ข้าพระองค์ตายและมีชีวิต",
      ms: "Dengan nama-Mu Ya Allah, aku mati dan aku hidup"
    },
    category: { th: "ก่อนนอน", ms: "Sebelum Tidur" }
  },
  {
    id: 16,
    title: { th: "ดุอาอ์ตื่นนอน", ms: "Doa Bangun Tidur" },
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: { 
      th: "อัลฮัมดุลิลลาฮิลละซี อะห์ยานา บะอ์ดะ มา อะมาตะนา วะอิลัยฮินนุชูร",
      ms: "Alhamdulillahilladzi ahyana ba'da maa amaatana wa ilaihin nusyuur"
    },
    meaning: { 
      th: "มวลการสรรเสริญเป็นของอัลลอฮ์ ผู้ทรงให้เรามีชีวิตหลังจากที่ทรงให้เราตาย และยังพระองค์คือการฟื้นคืนชีพ",
      ms: "Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami dan kepada-Nya kebangkitan"
    },
    category: { th: "ตื่นนอน", ms: "Bangun Tidur" }
  },
  // ดุอาอ์รับประทานอาหาร
  {
    id: 17,
    title: { th: "ดุอาอ์ก่อนรับประทานอาหาร", ms: "Doa Sebelum Makan" },
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    transliteration: { 
      th: "บิสมิลลาฮ์ วะอะลา บะรอกะติลลาฮ์",
      ms: "Bismillah wa 'ala barakatillah"
    },
    meaning: { 
      th: "ด้วยพระนามของอัลลอฮ์ และด้วยความบะรอกะฮ์ของอัลลอฮ์",
      ms: "Dengan nama Allah dan dengan keberkatan Allah"
    },
    category: { th: "อาหาร", ms: "Makanan" }
  },
  {
    id: 18,
    title: { th: "ดุอาอ์หลังรับประทานอาหาร", ms: "Doa Selepas Makan" },
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    transliteration: { 
      th: "อัลฮัมดุลิลลาฮิลละซี อัฏอะมะนา วะสะกอนา วะญะอะละนา มุสลิมีน",
      ms: "Alhamdulillahilladzi ath'amana wa saqana wa ja'alana muslimin"
    },
    meaning: { 
      th: "มวลการสรรเสริญเป็นของอัลลอฮ์ ผู้ทรงให้อาหารแก่เรา ให้เครื่องดื่มแก่เรา และทรงทำให้เราเป็นมุสลิม",
      ms: "Segala puji bagi Allah yang memberi makan kami, memberi minum kami dan menjadikan kami muslimin"
    },
    category: { th: "อาหาร", ms: "Makanan" }
  },
  // ดุอาอ์อื่นๆ
  {
    id: 19,
    title: { th: "ดุอาอ์ขอความรู้", ms: "Doa Minta Ilmu" },
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: { 
      th: "ร็อบบิ ซิดนี อิลมา",
      ms: "Rabbi zidni 'ilma"
    },
    meaning: { 
      th: "โอ้พระผู้อภิบาลของข้าพระองค์ โปรดเพิ่มพูนความรู้แก่ข้าพระองค์",
      ms: "Ya Tuhanku, tambahkanlah ilmuku"
    },
    category: { th: "ขอพร", ms: "Permohonan" }
  },
  {
    id: 20,
    title: { th: "ดุอาอ์ขอความง่ายดาย", ms: "Doa Minta Kemudahan" },
    arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
    transliteration: { 
      th: "อัลลอฮุมมะ ลา สะฮ์ละ อิลลา มา ญะอัลตะฮู สะฮ์ลัน วะอันตะ ตัจอะลุลฮุซนะ อิซา ชิอ์ตะ สะฮ์ลา",
      ms: "Allahumma laa sahla illa maa ja'altahu sahlan wa anta taj'alul hazna idza syi'ta sahla"
    },
    meaning: { 
      th: "โอ้อัลลอฮ์ ไม่มีสิ่งใดง่ายนอกจากสิ่งที่พระองค์ทรงทำให้มันง่าย และพระองค์สามารถทำให้ความทุกข์ยากกลายเป็นเรื่องง่ายดายเมื่อพระองค์ประสงค์",
      ms: "Ya Allah, tiada yang mudah kecuali apa yang Engkau jadikan mudah, dan Engkau boleh menjadikan kesusahan itu mudah jika Engkau kehendaki"
    },
    category: { th: "ขอพร", ms: "Permohonan" }
  },
];

const DuaCollection = () => {
  const { t, language } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoryLabels = {
    all: { th: "ทั้งหมด", ms: "Semua" }
  };

  const allCategories = [...new Set(duas.map(d => d.category.th))];
  const categories = ["all", ...allCategories];
  
  const filteredDuas = selectedCategory === "all" 
    ? duas 
    : duas.filter(d => d.category.th === selectedCategory);

  const getCategoryLabel = (cat: string) => {
    if (cat === "all") return language === "th" ? "ทั้งหมด" : "Semua";
    const dua = duas.find(d => d.category.th === cat);
    return dua ? dua.category[language] : cat;
  };

  const copyToClipboard = (dua: Dua) => {
    const text = `${dua.arabic}\n\n${dua.transliteration[language]}\n\n${dua.meaning[language]}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    toast.success(t("dua.copied"));
    setTimeout(() => setCopiedId(null), 2000);
  };

  const texts = {
    th: { copy: "คัดลอกดุอาอ์", copied: "คัดลอกแล้ว" },
    ms: { copy: "Salin Doa", copied: "Disalin" }
  };

  return (
    <Card className="card-islamic">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl">
          <BookOpen className="h-6 w-6 text-primary" />
          {t("dua.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Filter */}
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap h-10 px-4 text-sm"
              >
                {getCategoryLabel(cat)}
              </Button>
            ))}
          </div>
        </ScrollArea>

        {/* Dua List */}
        <div className="space-y-3">
          {filteredDuas.map((dua) => (
            <div
              key={dua.id}
              className="rounded-xl border border-border bg-card/50 overflow-hidden transition-all active:scale-[0.99]"
            >
              <button
                onClick={() => setExpandedId(expandedId === dua.id ? null : dua.id)}
                className="w-full p-4 text-left flex items-center justify-between min-h-[72px]"
              >
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary mb-2">
                    {dua.category[language]}
                  </span>
                  <h3 className="font-semibold text-base">{dua.title[language]}</h3>
                </div>
                <div className="ml-3 p-2">
                  {expandedId === dua.id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {expandedId === dua.id && (
                <div className="px-4 pb-4 space-y-4 animate-fade-in">
                  <div className="p-4 rounded-xl bg-primary/5 text-right">
                    <p className="font-arabic text-2xl md:text-3xl leading-[2] text-foreground">
                      {dua.arabic}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-primary font-medium text-base leading-relaxed">
                      {dua.transliteration[language]}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {dua.meaning[language]}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(dua)}
                    className="w-full h-12 text-base"
                  >
                    {copiedId === dua.id ? (
                      <>
                        <Check className="h-5 w-5 mr-2" /> {texts[language].copied}
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5 mr-2" /> {texts[language].copy}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DuaCollection;
