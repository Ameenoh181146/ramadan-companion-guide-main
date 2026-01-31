import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import FastingTracker from "@/components/FastingTracker";
import DuaCollection from "@/components/DuaCollection";
import QuranReader from "@/components/QuranReader";
import PrayerTimes from "@/components/PrayerTimes";
import Dhikr from "@/components/Dhikr";
import RamadanTips from "@/components/RamadanTips";
import RamadanCountdown from "@/components/RamadanCountdown";
import { Calendar, BookOpen, Clock, Heart, Lightbulb, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <Header />
      
      <main className="px-3 py-4 max-w-lg mx-auto">
        {/* Countdown Card */}
        <div className="mb-4">
          <RamadanCountdown />
        </div>

        {/* Mobile Tabs - Bottom Navigation Style */}
        <Tabs defaultValue="fasting" className="w-full">
          <TabsList className="grid grid-cols-6 h-auto bg-muted/50 p-1.5 rounded-2xl mb-4 sticky top-2 z-10 backdrop-blur-sm">
            <TabsTrigger 
              value="fasting" 
              className="flex flex-col gap-1 py-3 px-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl"
            >
              <Calendar className="h-5 w-5 mx-auto" />
              <span className="text-[10px]">{t("nav.fasting")}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="quran" 
              className="flex flex-col gap-1 py-3 px-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl"
            >
              <BookOpen className="h-5 w-5 mx-auto" />
              <span className="text-[10px]">{t("nav.quran")}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="dua" 
              className="flex flex-col gap-1 py-3 px-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl"
            >
              <Moon className="h-5 w-5 mx-auto" />
              <span className="text-[10px]">{t("nav.dua")}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="dhikr" 
              className="flex flex-col gap-1 py-3 px-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl"
            >
              <Heart className="h-5 w-5 mx-auto" />
              <span className="text-[10px]">{t("nav.dhikr")}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="prayer" 
              className="flex flex-col gap-1 py-3 px-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl"
            >
              <Clock className="h-5 w-5 mx-auto" />
              <span className="text-[10px]">{t("nav.prayer")}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tips" 
              className="flex flex-col gap-1 py-3 px-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl"
            >
              <Lightbulb className="h-5 w-5 mx-auto" />
              <span className="text-[10px]">{t("nav.tips")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fasting" className="mt-0 animate-fade-in">
            <FastingTracker />
          </TabsContent>

          <TabsContent value="quran" className="mt-0 animate-fade-in">
            <QuranReader />
          </TabsContent>

          <TabsContent value="dua" className="mt-0 animate-fade-in">
            <DuaCollection />
          </TabsContent>

          <TabsContent value="dhikr" className="mt-0 animate-fade-in">
            <Dhikr />
          </TabsContent>

          <TabsContent value="prayer" className="mt-0 animate-fade-in">
            <PrayerTimes />
          </TabsContent>

          <TabsContent value="tips" className="mt-0 animate-fade-in">
            <RamadanTips />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground pb-6">
          <p className="font-arabic text-lg mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          <p>{t("footer.madeWith")}</p>
          <p className="mt-2">{t("footer.prayer")}</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
