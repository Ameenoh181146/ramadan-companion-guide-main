import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { BookOpen, Target, Award } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReadingProgress {
  currentJuz: number;
  pagesRead: number;
  dailyGoal: number;
  totalPages: number;
}

const QuranReader = () => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState<ReadingProgress>(() => {
    const saved = localStorage.getItem("quran-progress");
    if (saved) return JSON.parse(saved);
    return {
      currentJuz: 1,
      pagesRead: 0,
      dailyGoal: 20,
      totalPages: 604,
    };
  });

  const [todayPages, setTodayPages] = useState(() => {
    const saved = localStorage.getItem("quran-today");
    const data = saved ? JSON.parse(saved) : { date: "", pages: 0 };
    if (data.date === new Date().toDateString()) {
      return data.pages;
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem("quran-progress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem("quran-today", JSON.stringify({
      date: new Date().toDateString(),
      pages: todayPages
    }));
  }, [todayPages]);

  const addPages = (count: number) => {
    const newPagesRead = Math.min(progress.pagesRead + count, progress.totalPages);
    const newJuz = Math.ceil(newPagesRead / 20);
    
    setProgress(prev => ({
      ...prev,
      pagesRead: newPagesRead,
      currentJuz: newJuz
    }));
    
    setTodayPages(prev => prev + count);

    if (newPagesRead === progress.totalPages) {
      toast.success(t("quran.completedQuran"));
    } else if (todayPages + count >= progress.dailyGoal) {
      toast.success(t("quran.dailyGoalReached"));
    }
  };

  const percentComplete = (progress.pagesRead / progress.totalPages) * 100;
  const todayPercent = (todayPages / progress.dailyGoal) * 100;

  return (
    <Card className="card-islamic">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl">
          <BookOpen className="h-6 w-6 text-primary" />
          {t("quran.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{t("quran.overallProgress")}</span>
            <span className="text-sm text-muted-foreground">
              {progress.pagesRead} / {progress.totalPages} {t("quran.pages")}
            </span>
          </div>
          <Progress value={percentComplete} className="h-4" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{t("quran.juz")} {progress.currentJuz}</span>
            <span>{percentComplete.toFixed(1)}%</span>
          </div>
        </div>

        {/* Today's Goal */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <span className="font-medium">{t("quran.todayGoal")}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-primary">{todayPages}</span>
            <span className="text-muted-foreground text-lg">/ {progress.dailyGoal} {t("quran.pages")}</span>
          </div>
          
          <Progress value={Math.min(todayPercent, 100)} className="h-3" />
          
          {todayPages >= progress.dailyGoal && (
            <div className="flex items-center justify-center gap-2 text-accent font-medium">
              <Award className="h-5 w-5" />
              <span>{t("quran.goalReached")}</span>
            </div>
          )}
        </div>

        {/* Add Pages - Large Touch Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 5, 10].map((num) => (
            <Button
              key={num}
              onClick={() => addPages(num)}
              variant={num === 10 ? "default" : "outline"}
              className="h-16 text-lg font-semibold"
            >
              +{num}
            </Button>
          ))}
        </div>

        {/* Set Daily Goal */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
          <label className="text-sm text-muted-foreground whitespace-nowrap">
            {t("quran.dailyGoal")}
          </label>
          <Input
            type="number"
            value={progress.dailyGoal}
            onChange={(e) => setProgress(prev => ({
              ...prev,
              dailyGoal: parseInt(e.target.value) || 1
            }))}
            className="w-20 h-12 text-center text-lg"
            min={1}
          />
          <span className="text-sm text-muted-foreground">{t("quran.pages")}</span>
        </div>

        {/* Khatam Progress - Juz Grid */}
        <div>
          <p className="text-sm font-medium mb-3 text-center">{t("quran.juzRead")}</p>
          <div className="grid grid-cols-6 gap-2">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                  i + 1 <= progress.currentJuz
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranReader;
