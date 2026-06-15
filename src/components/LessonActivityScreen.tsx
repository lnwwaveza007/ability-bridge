/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, Volume2, Sparkles, AlertCircle, ArrowRight, CheckCircle, HelpCircle, GraduationCap, XCircle } from "lucide-react";
import { CourseModule } from "../data/courses";
import { ALL_TOOLS } from "../data/initialState";
import { AccessibilitySettings } from "../types";

interface LessonActivityScreenProps {
  module: CourseModule;
  moduleIndex: number;
  onBackToDashboard: () => void;
  onVerifyUnlock: (toolId: string) => void;
  onCompleteModule: (index: number) => void;
  settings: AccessibilitySettings;
  onAnnounce: (text: string) => void;
}

export default function LessonActivityScreen({
  module,
  moduleIndex,
  onBackToDashboard,
  onVerifyUnlock,
  onCompleteModule,
  settings,
  onAnnounce
}: LessonActivityScreenProps) {
  const [currentStep, setCurrentStep] = useState<"LESSON" | "ACTIVITY" | "REWARD">("LESSON");
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [activityStatus, setActivityStatus] = useState<"UNANSWERED" | "CORRECT" | "INCORRECT">("UNANSWERED");
  const [activeSubtitle, setActiveSubtitle] = useState<string | null>(null);

  // Read out voice simulation
  const speakLesson = () => {
    const textToSpeak = settings.simpleLanguage 
      ? module.simpleContent.audioScript 
      : module.standardContent.audioScript;
    
    // Announce via status overlay
    setActiveSubtitle(textToSpeak);
    onAnnounce(`Read aloud: ${textToSpeak}`);

    // If speech synthesis is available in this iframe environment
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "en-US";
      
      // Let's add simple support for Thai text in Thai names
      if (module.titleTh && /[\u0e00-\u0e7f]/.test(module.titleTh)) {
        // Just standard speech fallback
      }
      
      utterance.onend = () => {
        // Stays for convenience
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (id: string) => {
    setSelectedOptionId(id);
    setActivityStatus("UNANSWERED");
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) return;
    const selectedObj = module.activity.options.find(opt => opt.id === selectedOptionId);
    if (selectedObj?.isCorrect) {
      setActivityStatus("CORRECT");
      onAnnounce("Correct answer! " + selectedObj.explanation);
      
      // Trigger unlock logic
      if (module.toolUnlockedId) {
        onVerifyUnlock(module.toolUnlockedId);
        setCurrentStep("REWARD");
      } else {
        // Module 1 is onboarding, has no tool, complete immediately
        onCompleteModule(moduleIndex);
        setCurrentStep("REWARD");
      }
    } else {
      setActivityStatus("INCORRECT");
      onAnnounce("Incorrect. Look closely at the tips. " + (selectedObj?.explanation || ""));
    }
  };

  const handleRewardComplete = () => {
    onCompleteModule(moduleIndex);
    onBackToDashboard();
  };

  // Get active wording
  const content = settings.simpleLanguage ? module.simpleContent : module.standardContent;

  return (
    <div className={`p-1 max-w-4xl mx-auto space-y-6 ${settings.highContrast ? "text-white" : "text-slate-800"}`}>
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Journey (กลับไปหน้าหลัก)</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">
          {currentStep === "LESSON" && "Step 1 of 2: Study Content"}
          {currentStep === "ACTIVITY" && "Step 2 of 2: Practical Activity"}
          {currentStep === "REWARD" && "Complete! Claim reward"}
        </span>
      </div>

      {/* Spoken subtitle box warning / audio player feedback */}
      {activeSubtitle && (
        <div className="bg-indigo-50 border border-indigo-150 p-3.5 rounded-xl flex items-start gap-2.5 animate-fade-in text-indigo-900">
          <Volume2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="block text-[10px] uppercase tracking-wider font-extrabold text-indigo-800">
              Barista Coach Voice-Over (เสียงผู้ช่วยบรูว์):
            </span>
            <p className="text-xs text-slate-700 leading-normal">{activeSubtitle}</p>
          </div>
          <button 
            onClick={() => setActiveSubtitle(null)}
            className="text-[10px] text-indigo-800 underline ml-auto cursor-pointer shrink-0 font-bold"
          >
            Close Subtitle
          </button>
        </div>
      )}

      {/* ==================== 1. LESSON STEP ==================== */}
      {currentStep === "LESSON" && (
        <div className="space-y-6 animate-fade-in">
          {/* Header Title Grid */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase">
              Now Studying (กำลังเรียน)
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {settings.simpleLanguage ? content.title : module.title}
              </h1>
              
              <button
                onClick={speakLesson}
                className="flex items-center justify-center gap-1.5 bg-emerald-100 hover:bg-emerald-250 text-emerald-850 px-4 py-2 rounded-xl text-xs font-bold transition-all self-start md:self-auto cursor-pointer"
              >
                <Volume2 size={14} className="animate-bounce" />
                <span>Hear Lesson (ฟังเสียงบรรยาย)</span>
              </button>
            </div>
          </div>

          {/* Visual card */}
          <div className={`p-6 rounded-2xl border ${
            settings.highContrast ? "bg-black border-white" : "bg-white border-slate-200/80 shadow-sm"
          } space-y-6`}>
            
            {/* Visual Icon / Theme element representing classroom */}
            <div className="w-full bg-indigo-50/60 border border-indigo-100 rounded-xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-600/10 text-indigo-700 flex items-center justify-center font-bold">
                <GraduationCap size={24} />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-805">Core Marketing Idea</span>
                <p className="text-sm font-semibold text-slate-800">"{settings.simpleLanguage ? "Show what we CAN do with a smile!" : "Deliver value with premium quality and dignity."}"</p>
              </div>
            </div>

            {/* Concept text */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                👩‍🏫 Lesson Description (คำอธิบายบทเรียน)
              </h4>
              <p className={`leading-relaxed text-slate-755 ${
                settings.textSize === "normal" ? "text-sm md:text-base" : settings.textSize === "large" ? "text-base md:text-lg" : "text-lg md:text-xl font-bold"
              }`}>
                {content.concept}
              </p>
            </div>

            {/* Examples card block */}
            <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-xl space-y-2.5">
              <h5 className="text-xs font-bold text-amber-850 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-600" />
                <span>Example Situation (สถานการณ์ตัวอย่าง)</span>
              </h5>
              <p className={`text-xs text-amber-900 italic leading-relaxed leading-relaxed ${
                settings.textSize === "extra-large" ? "text-base" : "text-xs"
              }`}>
                {content.example}
              </p>
            </div>
          </div>

          {/* Next Button bar */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setCurrentStep("ACTIVITY");
                onAnnounce("Moving to practical lesson activity. Get ready to select card answers.");
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-indigo-150 transition-all text-sm cursor-pointer"
            >
              <span>Practice Activity (ทำกิจกรรมฝึกหัด)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ==================== 2. ACTIVITY STEP ==================== */}
      {currentStep === "ACTIVITY" && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-1.5 text-left">
            <span className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase">
              PRACTICAL CHALLENGE (บททดสอบสถานการณ์จริง)
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {settings.simpleLanguage ? "Review What You Learned (ทบทวนความรู้กัน)" : "Dignity-first decision scenario"}
            </h2>
          </div>

          <div className={`p-6 rounded-2xl border ${
            settings.highContrast ? "bg-black border-white" : "bg-white border-slate-200/85"
          } space-y-6`}>
            
            {/* Question prompt */}
            <div className={`font-bold text-slate-900 ${
              settings.textSize === "normal" ? "text-base" : settings.textSize === "large" ? "text-lg" : "text-xl"
            }`}>
              ❓ {settings.simpleLanguage ? module.activity.question : module.activity.question}
              <div className="text-xs text-slate-400 font-normal mt-1 italic">
                {module.activity.questionTh}
              </div>
            </div>

            {/* Options grid */}
            <div className="space-y-3">
              {module.activity.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isSelected
                        ? "bg-indigo-50/60 border-indigo-600 shadow-sm"
                        : "bg-white border-slate-150 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300"
                    }`}>
                      {isSelected && <span className="text-[10px] font-black">✔</span>}
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-slate-800 font-medium">
                        {option.text}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submit responses / Results alerts */}
            {activityStatus === "INCORRECT" && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-2.5">
                <XCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-red-800">Please try again / ลองใหม่อีกครั้ง</span>
                  <p className="text-xs text-slate-600">
                    {module.activity.options.find(opt => opt.id === selectedOptionId)?.explanation}
                  </p>
                </div>
              </div>
            )}

            {activityStatus === "CORRECT" && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-2.5">
                <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-emerald-800">Excellent Work! / ถูกต้องเก่งมาก!</span>
                  <p className="text-xs text-slate-600">
                    {module.activity.options.find(opt => opt.id === selectedOptionId)?.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Action panel btn */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setCurrentStep("LESSON");
                  setActivityStatus("UNANSWERED");
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                ← Back to Read Lesson
              </button>

              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  selectedOptionId
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-150"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                Submit Answer (ตรวจคำตอบ)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3. REWARD STEP ==================== */}
      {currentStep === "REWARD" && (
        <div className="space-y-6 text-center py-8 animate-bounce-short">
          <div className="max-w-md mx-auto space-y-5 bg-gradient-to-b from-purple-900 to-slate-900 p-8 rounded-3xl border border-purple-500 text-white shadow-2xl relative overflow-hidden">
            
            {/* Ambient background rays */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>

            <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400 mx-auto flex items-center justify-center shadow-lg">
              <Sparkles size={32} className="animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-purple-300">
                MODULE COMPLETED SUCCESSFULLY
              </span>
              <h2 className="text-2xl font-black tracking-tight">
                {module.toolUnlockedId ? "New AI Tool Unlocked! (ปลดล็อกเครื่องมือใหม่สำเร็จ)" : "Level Conquered!"}
              </h2>
            </div>

            {module.toolUnlockedId ? (
              <div className="bg-white/10 border border-white/10 p-4 rounded-xl space-y-2.5 text-left">
                <span className="text-[9px] font-black uppercase text-emerald-400 tracking-wider">
                  ACTIVATED POWERUP:
                </span>
                <h4 className="text-sm font-bold text-purple-200">
                  {module.toolUnlockedName}
                </h4>
                <p className="text-xs text-slate-300 leading-normal">
                  {module.toolUnlockedDesc}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-350">
                You have finished Module 1: What is Marketing! Now you are ready to target customers and build specific personas.
              </p>
            )}

            <p className="text-[11px] text-slate-400">
              This newly unlocked assistant is now active inside the 20Rai AI Marketing Dashboard.
            </p>

            <button
              onClick={handleRewardComplete}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-extrabold px-5 py-3 rounded-xl transition-all shadow-md text-xs cursor-pointer"
            >
              Go to Your Journey (หน้าหลัก)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
