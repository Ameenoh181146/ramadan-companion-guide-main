import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface FastingDay {
  day: number;
  status: "fasted" | "missed" | "excused" | null;
  madeUp?: boolean;
}

const FastingTracker = () => {
  const { t } = useLanguage();
  const [fastingDays, setFastingDays] = useState<FastingDay[]>(() => {
    const saved = localStorage.getItem("ramadan-fasting");
    if (saved) return JSON.parse(saved);
    return Array.from({ length: 30 }, (_, i) => ({ day: i + 1, status: null, madeUp: false }));
  });

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("ramadan-fasting", JSON.stringify(fastingDays));
  }, [fastingDays]);

  const updateDayStatus = (day: number, status: "fasted" | "missed" | "excused") => {
    setFastingDays((prev) => 
      prev.map((d) => (d.day === day ? { ...d, status } : d))
    );
    setSelectedDay(null);
    
    if (status === "fasted") {
      toast.success(t("fasting.recordedFasted"));
    } else if (status === "excused") {
      toast.info(t("fasting.recordedExcused"));
    }
  };

  const markAsMadeUp = (day: number) => {
    setFastingDays((prev) => 
      prev.map((d) => 
        d.day === day && d.status === "excused" ? { ...d, madeUp: true } : d
      )
    );
    setSelectedDay(null);
    toast.success(t("fasting.madeUpSuccess"));
  };

  const fastedCount = fastingDays.filter((d) => d.status === "fasted").length;
  const excusedCount = fastingDays.filter((d) => d.status === "excused").length;
  const madeUpCount = fastingDays.filter((d) => d.status === "excused" && d.madeUp).length;
  const remainingToMakeUp = excusedCount - madeUpCount;

  const getStatusColor = (day: FastingDay) => {
    if (day.status === "fasted") return "bg-primary text-primary-foreground";
    if (day.status === "excused" && day.madeUp) return "bg-accent text-accent-foreground";
    if (day.status === "excused") return "bg-pink-500 text-white";
    if (day.status === "missed") return "bg-destructive/20 text-destructive";
    return "bg-muted text-muted-foreground";
  };

  const selectedDayData = selectedDay ? fastingDays.find(d => d.day === selectedDay) : null;

  return (
    <Card className="card-islamic">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Calendar className="h-6 w-6 text-primary" />
          {t("fasting.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Stats - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-primary/10 p-4 text-center">
            <p className="text-3xl font-bold text-primary">{fastedCount}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("fasting.fastedDays")}</p>
          </div>
          <div className="rounded-xl bg-pink-500/10 p-4 text-center">
            <p className="text-3xl font-bold text-pink-600">{excusedCount}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("fasting.excusedDays")}</p>
          </div>
          <div className="rounded-xl bg-accent/10 p-4 text-center">
            <p className="text-3xl font-bold text-accent">{madeUpCount}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("fasting.madeUp")}</p>
          </div>
          <div className="rounded-xl bg-secondary p-4 text-center">
            <p className="text-3xl font-bold text-secondary-foreground">{remainingToMakeUp}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("fasting.remaining")}</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="bg-primary/20 h-8 px-3">
            <Check className="mr-1 h-3 w-3" /> {t("fasting.fasted")}
          </Badge>
          <Badge variant="outline" className="bg-pink-500/20 text-pink-700 h-8 px-3">
            💕 {t("fasting.excused")}
          </Badge>
          <Badge variant="outline" className="bg-accent/20 h-8 px-3">
            ✓ {t("fasting.madeUpLabel")}
          </Badge>
        </div>

        {/* Calendar Grid - Large Touch Targets */}
        <div className="grid grid-cols-5 gap-2">
          {fastingDays.map((day) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center font-semibold text-lg transition-all active:scale-95 ${getStatusColor(day)} ${
                selectedDay === day.day ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
            >
              {day.day}
              {day.status === "fasted" && (
                <Check className="h-3 w-3 mt-0.5" />
              )}
              {day.status === "excused" && !day.madeUp && (
                <span className="text-xs">💕</span>
              )}
              {day.status === "excused" && day.madeUp && (
                <span className="text-xs">✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons - Shows when day is selected */}
        {selectedDay && selectedDayData && (
          <div className="p-4 rounded-xl bg-secondary/50 space-y-3 animate-fade-in">
            <p className="text-center font-medium">{t("fasting.day")} {selectedDay}</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => updateDayStatus(selectedDay, "fasted")}
                className="h-14 text-base"
                variant={selectedDayData.status === "fasted" ? "default" : "outline"}
              >
                <Check className="h-5 w-5 mr-2" />
                {t("fasting.fasted")}
              </Button>
              <Button
                onClick={() => updateDayStatus(selectedDay, "excused")}
                className="h-14 text-base"
                variant={selectedDayData.status === "excused" ? "default" : "outline"}
              >
                💕 {t("fasting.excused")}
              </Button>
            </div>
            {selectedDayData.status === "excused" && !selectedDayData.madeUp && (
              <Button
                onClick={() => markAsMadeUp(selectedDay)}
                className="w-full h-14 text-base bg-accent hover:bg-accent/90"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                {t("fasting.madeUpLabel")}
              </Button>
            )}
          </div>
        )}

        <p className="text-sm text-muted-foreground text-center">
          {t("fasting.tapToRecord")}
        </p>
      </CardContent>
    </Card>
  );
};

export default FastingTracker;
