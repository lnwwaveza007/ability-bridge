/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BookOpen, Lock, Unlock, Play, Sparkles, Award, FastForward, CheckCircle, Volume2, Calendar, Smile, Star, Check, ChevronRight } from "lucide-react";
import { COURSE_MODULES, CourseModule } from "../data/courses";
import { ALL_TOOLS } from "../data/initialState";
import { AccessibilitySettings } from "../types";

interface LearningDashboardProps {
  completedModules: number[]; // Array of course module indexesCompleted
  unlockedTools: string[];   // Array of unlocked toolIds
  onStartModule: (index: number) => void;
  onOverrideUnlock: (toolId: string) => void;
  onOverrideLock: (toolId: string) => void;
  settings: AccessibilitySettings;
  activeLearnerName: string;
  onAnnounce: (text: string) => void;
}

interface CalendarDay {
  dayName: string;
  dayNameTh: string;
  icon: string;
  colorClass: string;
  colorBg: string;
  moduleIndexes: number[];
  motivation: string;
  motivationTh: string;
}

const CALENDAR_DAYS: CalendarDay[] = [
  {
    dayName: "Monday",
    dayNameTh: "วันจันทร์",
    icon: "📦",
    colorClass: "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20",
    colorBg: "bg-amber-500",
    moduleIndexes: [0, 1], // Module 1 & 2
    motivation: "Start the week strong! Learn about Marketing and knowing your customer.",
    motivationTh: "เริ่มต้นสัปดาห์อย่างสดใส! มาทำความเข้าใจการตลาด และทำความรู้จักกับลูกค้าคนสำคัญกันครับ"
  },
  {
    dayName: "Tuesday",
    dayNameTh: "วันอังคาร",
    icon: "💡",
    colorClass: "text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-950/20",
    colorBg: "bg-rose-500",
    moduleIndexes: [2, 3], // Module 3 & 4
    motivation: "Today we discover our real Product Value and how to share our Story with Dignity.",
    motivationTh: "วันนี้เรามาหาจุดเด่นที่แท้จริงของผลงานเรา และวิธีการเล่าเรื่องของเราอย่างภาคภูมิใจกันเลย"
  },
  {
    dayName: "Wednesday",
    dayNameTh: "วันพุธ",
    icon: "✍️",
    colorClass: "text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20",
    colorBg: "bg-emerald-500",
    moduleIndexes: [4], // Module 5
    motivation: "Let's learn how to write warm Promoted Captions for Facebook & LINE!",
    motivationTh: "วันนี้มาฝึกศิลปะการเขียนคำอธิบายและพาดหัวโฆษณาสินค้าลงโซเชียลมีเดียกันเถอะ"
  },
  {
    dayName: "Thursday",
    dayNameTh: "วันพฤหัสบดี",
    icon: "📸",
    colorClass: "text-orange-600 border-orange-200 bg-orange-50 dark:bg-orange-950/20",
    colorBg: "bg-orange-500",
    moduleIndexes: [5], // Module 6
    motivation: "Bring in the natural light! Discover Photo Basics to make products shine beautifully.",
    motivationTh: "รูปสวยยอดขายปัง! มาเรียนรู้เทคนิคการถ่ายภาพสินค้าให้น่าสนใจด้วยแสงธรรมชาติกันครับ"
  },
  {
    dayName: "Friday",
    dayNameTh: "วันศุกร์",
    icon: "📥",
    colorClass: "text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/20",
    colorBg: "bg-blue-500",
    moduleIndexes: [6, 7], // Module 7 & 8
    motivation: "Log customer Inquiries carefully and break big orders down as a Team!",
    motivationTh: "วันศุกร์แห่งความสุข! มาเรียนรู้การบันทึกข้อมูลลูกค้า และช่วยกันแบ่งงานผลิตเป็นทีม"
  },
  {
    dayName: "Saturday",
    dayNameTh: "วันเสาร์",
    icon: "🤖",
    colorClass: "text-purple-600 border-purple-200 bg-purple-50 dark:bg-purple-950/20",
    colorBg: "bg-purple-500",
    moduleIndexes: [8, 9], // Module 9 & 10 (Skill Badge & AI Tools!)
    motivation: "Double power! Capture your Skill Badge & learn to work with ChatGPT, Gemini, and Claude!",
    motivationTh: "เพิ่มพลังสมองกับ AI! มาศึกษาการทำงานของปัญญาประดิษฐ์ช่วยเหลือการเขียนโพสต์อย่างสนุกสนาน"
  },
  {
    dayName: "Sunday",
    dayNameTh: "วันอาทิตย์",
    icon: "🌸",
    colorClass: "text-pink-600 border-pink-200 bg-pink-50 dark:bg-pink-950/20",
    colorBg: "bg-pink-500",
    moduleIndexes: [], // Review Day
    motivation: "Rest and enjoy our 20Rai Cafe! Smile and look over your great progress.",
    motivationTh: "วันอาทิตย์แสนสบาย! ผ่อนคลายในสวนคาเฟ่ 20Rai และทบทวนความรู้ที่เราตั้งใจฝึกฝนสะสมมา"
  }
];

const MODULE_IMAGES: Record<string, { url: string; alt: string; tag: string }> = {
  "module-1": {
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
    alt: "Marketing concept: learning, sharing and presenting work with pride",
    tag: "Value Creation / สร้างคุณค่า"
  },
  "module-2": {
    url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400",
    alt: "A friendly coffee barista handing over coffee with a warm greeting",
    tag: "Our Customers / รู้จักลูกค้า"
  },
  "module-3": {
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400",
    alt: "Handcrafted smooth pine wooden product in clean sunlight",
    tag: "Service Quality / สื่อสารจุดเด่น"
  },
  "module-4": {
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
    alt: "Trainees sitting around wooden workbench talking with confidence",
    tag: "Story with Dignity / เรื่องราวมีเกียรติ"
  },
  "module-5": {
    url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400",
    alt: "A social media template on hand tablet with simple words and smileys",
    tag: "Caption Magic / เขียนคำพาดหัว"
  },
  "module-6": {
    url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400",
    alt: "Camera phone photographing a chocolate cookie and glass of milk by window",
    tag: "Photo Basics / เทคนิคการถ่ายภาพ"
  },
  "module-7": {
    url: "https://images.unsplash.com/photo-1423662055902-3e6e7e6426a4?auto=format&fit=crop&q=80&w=400",
    alt: "A tablet displaying incoming reservation logs and smiling face icon",
    tag: "Customer Leads / การติดตามลูกค้า"
  },
  "module-8": {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
    alt: "Interactive team grouping smaller tasks on whiteboard with colorful cards",
    tag: "Split Tasks / แบ่งกระบวนการทำงาน"
  },
  "module-9": {
    url: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&q=80&w=400",
    alt: "A physical portfolio folder with colorful badges and a learner profile",
    tag: "Skill Passport / แฟ้มผลงานทักษะ"
  },
  "module-10": {
    url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400",
    alt: "AI assistant on screen showing easy conversation chat tags",
    tag: "AI Assistant / เพื่อนคู่คิดคอมพิวเตอร์"
  }
};

export default function LearningDashboard({
  completedModules,
  unlockedTools,
  onStartModule,
  onOverrideUnlock,
  onOverrideLock,
  settings,
  activeLearnerName,
  onAnnounce
}: LearningDashboardProps) {

  // Default to Easy Mode
  const [easyMode, setEasyMode] = useState<boolean>(true);
  
  // Set selected calendar day (defaults to Monday / Day 0, or today if safe)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(() => {
    try {
      const day = new Date().getDay();
      return day === 0 ? 6 : day - 1; // standard: Sunday (0) -> 6, Monday (1) -> 0
    } catch {
      return 0;
    }
  });

  // Total progress
  const currentProgressPercent = Math.round((completedModules.length / COURSE_MODULES.length) * 100);
  const isSudaProgressDemo = activeLearnerName.toLowerCase().includes("suda");

  // Quick read out of current progress
  const readProgress = () => {
    onAnnounce(`${activeLearnerName} has finished ${completedModules.length} of ${COURSE_MODULES.length} lessons. Total progress is ${currentProgressPercent} percent.`);
  };

  const handleSelectDay = (idx: number) => {
    setSelectedDayIndex(idx);
    const selectedDay = CALENDAR_DAYS[idx];
    onAnnounce(`Selected ${selectedDay.dayName}. Scheduled lessons for today: ${selectedDay.moduleIndexes.length}`);
  };

  const toggleEasyMode = (val: boolean) => {
    setEasyMode(val);
    onAnnounce(`Switched dashboard to ${val ? "Easy Mode" : "Standard Route"}`);
  };

  return (
    <div className={`space-y-8 ${settings.highContrast ? "text-white" : "text-slate-800"}`}>
      {/* Overview Card */}
      <div className={`p-6 rounded-2xl border transition-all ${
        settings.highContrast 
          ? "bg-black border-white" 
          : "bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white shadow-lg shadow-indigo-900/15"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                Active Scholar: {activeLearnerName}
              </span>
              {settings.voiceEnabled && (
                <button 
                  onClick={readProgress}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all cursor-pointer"
                  title="Read progress out loud"
                >
                  <Volume2 size={14} className="hover:scale-110" />
                </button>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {settings.simpleLanguage 
                ? "Your Learning Progress (บทเรียนของคุณ)" 
                : "Marketing & AI Basics for Inclusive Offerings"}
            </h2>
            <p className="text-sm text-indigo-100/90 max-w-xl">
              {settings.simpleLanguage
                ? "Complete each colorful block. When you win the activity, you get awesome marketing powerups and AI assistants!"
                : "Learn how to formulate strong value descriptors, write dignity-driven stories, and command ChatGPT, Gemini, and Claude for your business."}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 self-start md:self-auto">
            <div className="text-center">
              <span className="block text-3xl font-black text-indigo-400">{currentProgressPercent}%</span>
              <span className="text-[10px] uppercase text-emerald-300 font-bold tracking-widest">Completed</span>
            </div>
            <div className="w-1 px-3 bg-white/10 h-10"></div>
            <div className="text-left">
              <span className="block text-xs font-bold text-slate-350">
                {completedModules.length} / {COURSE_MODULES.length} Lessons Finished
              </span>
              <span className="block text-[10px] text-indigo-305">
                Unlocked Tools: {unlockedTools.length} / {ALL_TOOLS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress gauge bar */}
        <div className="mt-6">
          <div className="w-full bg-white/15 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-400 h-full transition-all duration-500" 
              style={{ width: `${currentProgressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Mode Switch Panel */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => toggleEasyMode(true)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              easyMode 
                ? "bg-indigo-650 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <Calendar size={14} />
            <span>📅 Easy Mode (ปฏิทินเรียนรู้ง่าย)</span>
          </button>
          <button
            onClick={() => toggleEasyMode(false)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              !easyMode 
                ? "bg-indigo-650 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <BookOpen size={14} />
            <span>📋 Standard view (เส้นทางปกติ)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-bold">Suggested Today:</span>
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
            {CALENDAR_DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].dayName} - {CALENDAR_DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].icon}
          </span>
        </div>
      </div>

      {easyMode ? (
        /* ==================== EASY CALENDAR CHECKLIST MODE ==================== */
        <div className="space-y-6">
          {/* Calendar row */}
          <div>
            <h3 className="text-base font-extrabold flex items-center gap-2 mb-3">
              <Calendar className="text-indigo-600" size={18} />
              <span>Weekly Learning Plan (แผนการเรียนส่วนตัวประจำสัปดาห์)</span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {CALENDAR_DAYS.map((day, dIdx) => {
                const isSelected = selectedDayIndex === dIdx;
                
                // Calculate day completion status
                const isDayEmpty = day.moduleIndexes.length === 0;
                const isDayAllFinished = !isDayEmpty && day.moduleIndexes.every(idx => completedModules.includes(idx));
                const completedCount = day.moduleIndexes.filter(idx => completedModules.includes(idx)).length;

                return (
                  <button
                    key={day.dayName}
                    id={`day-${dIdx}`}
                    onClick={() => handleSelectDay(dIdx)}
                    className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-32 cursor-pointer ${
                      isSelected 
                        ? (settings.highContrast ? "border-white bg-black ring-4 ring-white" : "border-indigo-600 bg-indigo-50/50 shadow-md transform -translate-y-0.5")
                        : (settings.highContrast ? "border-slate-700 bg-zinc-950" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white")
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-slate-400 font-black tracking-wider uppercase">
                          {day.dayName.slice(0, 3)}
                        </span>
                        <span className="text-xl">{day.icon}</span>
                      </div>
                      <span className="block text-sm font-extrabold text-slate-800 dark:text-slate-100">
                        {day.dayNameTh}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {isDayEmpty ? (
                        <span className="text-[10px] text-pink-600 font-bold bg-pink-100/60 px-2 py-0.5 rounded-full">
                          Rest Day 🌸
                        </span>
                      ) : isDayAllFinished ? (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check size={8} strokeWidth={4} /> Done 🌟
                        </span>
                      ) : (
                        <span className="text-[10px] text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded-full">
                          {completedCount}/{day.moduleIndexes.length} Books
                        </span>
                      )}
                    </div>

                    {isDayAllFinished && !isDayEmpty && (
                      <span className="absolute top-1 right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Checklist detail */}
          <div className={`p-6 rounded-3xl border ${
            settings.highContrast ? "border-white bg-black text-white" : "border-slate-100 bg-slate-50/50"
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200/65 mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{CALENDAR_DAYS[selectedDayIndex].icon}</span>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <span>{CALENDAR_DAYS[selectedDayIndex].dayNameTh} Checklist</span>
                      <span className="text-xs font-normal text-slate-400">({CALENDAR_DAYS[selectedDayIndex].dayName})</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      {CALENDAR_DAYS[selectedDayIndex].motivationTh}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300">
                ⭐ Action items: <span className="text-indigo-600 font-black">{CALENDAR_DAYS[selectedDayIndex].moduleIndexes.length} blocks to do</span>
              </div>
            </div>

            {CALENDAR_DAYS[selectedDayIndex].moduleIndexes.length === 0 ? (
              /* REST DAY RENDER */
              <div className="text-center py-10 space-y-4 max-w-md mx-auto">
                <div className="h-36 rounded-2xl overflow-hidden shadow-sm relative">
                  <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400"
                    alt="Relaxing garden cafe view"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-white text-xs font-bold leading-none">20Rai Green Center Patio Cozy Corner</span>
                  </div>
                </div>
                <h4 className="text-base font-black text-slate-800">Sunday Rest & Cafe Walk (วันพักผ่อนแสนสบาย)</h4>
                <p className="text-xs text-slate-500 leading-normal">
                  Amazing work this week! There are no scheduled lessons for today. Take a walk in the 20Rai Cafe, talk to our warm clients, or review your customized AI captions.
                </p>
                <div className="flex justify-center gap-2">
                  <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs">☕ Sip Coffe</span>
                  <span className="px-3 py-1.5 bg-pink-105 text-pink-850 font-bold rounded-lg text-xs">🌸 Enjoy Garden</span>
                </div>
              </div>
            ) : (
              /* LESSON CARDS WITH LARGE PICTURES ("Picture is better than a lot of text") */
              <div className="grid md:grid-cols-2 gap-6">
                {CALENDAR_DAYS[selectedDayIndex].moduleIndexes.map((modIdx) => {
                  const mod = COURSE_MODULES[modIdx];
                  const img = MODULE_IMAGES[mod.id] || { 
                    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
                    alt: "Classroom learning scene",
                    tag: "Marketing Class"
                  };
                  const isCompleted = completedModules.includes(modIdx);
                  const isLocked = modIdx > 0 && !completedModules.includes(modIdx - 1);

                  return (
                    <div 
                      key={mod.id}
                      className={`rounded-2xl border transition-all overflow-hidden flex flex-col justify-between shadow-sm ${
                        isCompleted 
                          ? "bg-emerald-50/70 border-emerald-250 hover:border-emerald-300"
                          : isLocked 
                            ? "bg-slate-100/50 border-slate-200/50 opacity-60 pointer-events-none" 
                            : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md"
                      }`}
                    >
                      {/* Pictorial Header - Picture is better than raw text */}
                      <div className="h-44 w-full overflow-hidden relative bg-slate-900">
                        <img 
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full shadow">
                          {img.tag}
                        </div>

                        {/* Complete Check stamp */}
                        {isCompleted && (
                          <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                            <CheckCircle size={20} />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-4">
                          <div>
                            <span className="block text-[10px] text-emerald-305 font-bold uppercase tracking-wider mb-0.5">
                              {mod.id.toUpperCase()}
                            </span>
                            <h5 className="text-white text-base font-black leading-tight">
                              {settings.simpleLanguage ? mod.simpleContent.title : mod.titleTh}
                            </h5>
                          </div>
                        </div>
                      </div>

                      {/* Content panel */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {settings.simpleLanguage ? mod.simpleContent.concept : mod.descriptionTh}
                          </p>
                          
                          {mod.toolUnlockedId && (
                            <div className="p-2 bg-purple-50 rounded-xl border border-purple-100 flex items-center gap-2 mt-2">
                              <span className="text-base">🎁</span>
                              <div className="text-left leading-none">
                                <span className="block text-[9px] text-purple-750 font-black uppercase tracking-wider">Unlocks Creator Tool</span>
                                <span className="text-[11px] font-bold text-purple-900">{mod.toolUnlockedName}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          {isCompleted ? (
                            <button
                              onClick={() => onStartModule(modIdx)}
                              className="w-full py-2.5 bg-emerald-100 hover:bg-emerald-250 text-emerald-800 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <CheckCircle size={14} />
                              <span>Review Book (ทบทวนบทเรียน)</span>
                            </button>
                          ) : isLocked ? (
                            <div className="w-full py-2.5 bg-slate-100 text-slate-400 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-1 bg-slate-200/40">
                              <Lock size={12} />
                              <span>Complete previous lesson first</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => onStartModule(modIdx)}
                              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                            >
                              <Play size={12} fill="currentColor" />
                              <span>Start Learning Now (เริ่มบทเรียนทันที)</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ==================== STANDARD DETAILED LIST ROADMAP VIEW ==================== */
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lesson Pipeline Grid */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-600" />
              <span>Course Lesson Journey ({COURSE_MODULES.length} Lessons)</span>
            </h3>

            <div className="space-y-3">
              {COURSE_MODULES.map((mod, index) => {
                const isCompleted = completedModules.includes(index);
                const isLocked = index > 0 && !completedModules.includes(index - 1);
                
                return (
                  <div 
                    key={mod.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isCompleted 
                        ? "bg-emerald-50/60 border-emerald-200" 
                        : isLocked 
                          ? "bg-slate-50/50 border-slate-200/60 opacity-65" 
                          : "bg-white border-slate-150/80 shadow-sm"
                    }`}
                  >
                    <div className="space-y-1 max-w-md">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide ${
                          isCompleted 
                            ? "bg-emerald-200 text-emerald-800" 
                            : isLocked 
                              ? "bg-slate-200 text-slate-500" 
                              : "bg-indigo-100 text-indigo-800 animate-pulse"
                        }`}>
                          {isCompleted ? "COMPLETED" : isLocked ? "LOCKED" : "READY"}
                        </span>
                        {mod.toolUnlockedId && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-purple-750 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                            <Sparkles size={8} /> Unlocks Tool
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm md:text-base">
                        {settings.simpleLanguage ? mod.standardContent.title : (settings.textSize === "normal" ? mod.title : mod.titleTh)}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {settings.simpleLanguage ? mod.simpleContent.concept.slice(0, 100) + "..." : mod.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto">
                      {isCompleted ? (
                        <button
                          onClick={() => onStartModule(index)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-100 text-xs font-bold cursor-pointer"
                        >
                          <CheckCircle size={14} />
                          <span>Review Lesson</span>
                        </button>
                      ) : isLocked ? (
                        <div className="flex items-center gap-1 text-slate-400 text-xs px-3 py-1.5">
                          <Lock size={12} />
                          <span>Previous lesson required</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onStartModule(index)}
                          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:shadow-indigo-100 transition-all cursor-pointer font-sans"
                        >
                          <Play size={12} fill="currentColor" />
                          <span>Start Lesson</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Locked/Unlocked Tools Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Sparkles size={18} className="text-purple-600" />
                <span>Tools You Can Earn</span>
              </h3>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Unlock by finishing modules</span>
            </div>

            <div className="space-y-3.5">
              {ALL_TOOLS.map((tool) => {
                const worksUnlocked = unlockedTools.includes(tool.id);
                
                return (
                  <div 
                    key={tool.id} 
                    className={`p-3.5 rounded-xl border transition-all ${
                      worksUnlocked 
                        ? "bg-purple-50/85 border-purple-200" 
                        : "bg-slate-100/90 border-slate-200/95 text-slate-500"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        {worksUnlocked ? (
                          <Unlock size={14} className="text-purple-600" />
                        ) : (
                          <Lock size={14} className="text-slate-400" />
                        )}
                        <h4 className={`text-sm font-bold ${worksUnlocked ? "text-purple-900" : "text-slate-700"}`}>
                          {tool.name}
                        </h4>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        worksUnlocked ? "bg-purple-200 text-purple-800" : "bg-slate-200 text-slate-400"
                      }`}>
                        {worksUnlocked ? "UNLOCKED" : "LOCKED"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-normal mb-2.5">
                      {tool.description}
                    </p>

                    <div className="border-t border-slate-200/65 pt-2 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        Unlocks at Module {tool.requiredModuleIndex + 1}
                      </span>
                      
                      {!isSudaProgressDemo && (
                        <div className="flex gap-1.5">
                          {worksUnlocked ? (
                            <button 
                              onClick={() => onOverrideLock(tool.id)}
                              className="text-[9px] font-extrabold text-red-650 hover:underline cursor-pointer bg-red-50 px-1.5 py-0.5 rounded"
                              title="Override lock this tool for demo goals"
                            >
                              Lock Out
                            </button>
                          ) : (
                            <button 
                              onClick={() => onOverrideUnlock(tool.id)}
                              className="text-[9px] font-extrabold text-indigo-700 hover:underline cursor-pointer bg-indigo-50 px-1.5 py-0.5 rounded"
                              title="Quick override unlock for evaluating"
                            >
                              Demo Unlock
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
